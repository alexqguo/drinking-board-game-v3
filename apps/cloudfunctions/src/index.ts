/* eslint-disable turbo/no-undeclared-env-vars */
import { ActionType, Game, boardRegistry, requestHandler } from '@repo/engine';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { logger } from 'firebase-functions';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import pokemonGen1 from '../../../boards/pokemon-gen1/index.js';
import pokemonGen2 from '../../../boards/pokemon-gen2/index.js';
import pokemonGen3 from '../../../boards/pokemon-gen3/index.js';
import zelda from '../../../boards/zelda/index.js';

// Initialize the board registry at the top level (cold start)
const initializeBoardRegistry = () => {
  boardRegistry.register('pokemon-gen1', pokemonGen1);
  boardRegistry.register('pokemon-gen2', pokemonGen2);
  boardRegistry.register('zelda', zelda);

  // Add gen3 for local testing only right now
  if (process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
    boardRegistry.register('pokemon-gen3', pokemonGen3);
  }
};
initializeBoardRegistry();

interface DisplayMessage {
  msg: string;
}

interface RealtimeDbObject {
  game: Game;
  messages: DisplayMessage[];
}

interface CloudFunctionRequest {
  action: ActionType | 'listBoards';
  gameId: string;
  boardName: string;
  // eslint-disable-next-line
  actionArgs: any;
  actionNumber: number;
  seeds?: number[];
}

if (!getApps().length) {
  initializeApp();
}
const db = getDatabase();
// Connect to emulator instance if running locally
if (process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
  db.useEmulator(
    String(process.env.FIREBASE_DATABASE_EMULATOR_HOST.split(':')[0]),
    Number(process.env.FIREBASE_DATABASE_EMULATOR_HOST.split(':')[1]),
  );
}

const getDatabasePath = (id: string) => `games/${id}`;
const getEngineLoggers = ({ displayMessages }: { displayMessages: DisplayMessage[] }) => ({
  display: (s: string) => displayMessages.push({ msg: s }),
  debug: logger.debug,
  error: logger.error,
});

/**
 * This function is necessary because Firebase cannot store empty Objects or Arrays, so this
 * Game object would be missing those fields. Examples: itemIds and availableActions
 *
 * @param game game with potentially incomplete fields
 */
const redefineStrippedFields = (game: Game): Game => {
  Object.keys(game.players).forEach((pid) => {
    const player = game.players[pid];
    if (player) {
      player.effects.itemIds ||= [];
    }

    game.availableActions[pid] = {
      turnActions: game.availableActions[pid]?.turnActions || [],
      promptActions: game.availableActions[pid]?.promptActions || [],
    };
  });

  return game;
};

/**
 * Cloud function responsible for:
 * - Handling frontend requests
 * - Executing game engine
 * - Updating Realtime DB, using transactions to prevent race conditions
 *
 * Realtime DB is structured as:
 * - /games/{gameId}
 *  - /game -> engineResponse.game object
 *  - /messages -> game messages added through the logger
 */
export const gameRequest = onCall<CloudFunctionRequest>(
  { cors: ['https://drink.alexguo.co', 'http://localhost:5173'] },
  async (req) => {
    try {
      if (!req.auth) {
        throw new HttpsError('unauthenticated', 'Not signed in');
      }

      const {
        gameId: gameIdParam,
        action: actionParam,
        actionArgs: actionArgsParam,
        actionNumber: actionNumberParam,
        seeds: seedsParam,
      } = req.data;

      // Handle the getAvailableBoards action
      if (actionParam === 'listBoards') {
        // Get available boards from the registry
        const availableBoards = boardRegistry.getAvailableBoards();
        return {
          success: true,
          boardMetadatas: availableBoards.map((b) => b.metadata),
        };
      }

      const action = String(actionParam) as ActionType;
      logger.info(`Invoking engine with args: ${JSON.stringify(req.data)}`);

      if (action === ActionType.gameCreate) {
        const displayMessages: DisplayMessage[] = [];
        // If creating a game, we do not need a transaction as no data yet exists
        let result = requestHandler({
          action,
          actionArgs: actionArgsParam,
          prevGame: null,
          loggers: getEngineLoggers({ displayMessages }),
        });

        // May want to just go ahead and start the game as well...
        result = requestHandler({
          action: ActionType.gameStart,
          actionArgs: {},
          prevGame: result.game,
          loggers: getEngineLoggers({ displayMessages }),
        });

        // Create the game and put it into the database
        await db.ref(getDatabasePath(result.game.metadata.id)).set({
          game: result.game,
          messages: displayMessages,
        });

        return {
          success: true,
          gameId: result.game.metadata.id,
        };
      } else {
        // If updating a game, we need to setup a transaction
        const ref = db.ref(getDatabasePath(gameIdParam));

        // Improved transaction logic: only retry if currentData is null (initial creation race),
        // and reject immediately if actionNumber does not match.
        const executeTransaction = async (
          retries = 3,
        ): Promise<{ committed: boolean; error?: string }> => {
          try {
            const result = await ref.transaction((currentData: RealtimeDbObject | null) => {
              if (!currentData) {
                logger.warn(
                  `Transaction couldn't access data for game ${gameIdParam}, attempt ${4 - retries}/3`,
                );
                // In Firebase transactions, returning null aborts the transaction
                // We'll retry this case only
                return null;
              }

              // Check actionNumber for concurrency control
              const currentActionNumber = currentData.game?.actionNumber;
              if (
                typeof currentActionNumber === 'number' &&
                currentActionNumber !== actionNumberParam
              ) {
                logger.warn(
                  `Stale actionNumber for game ${gameIdParam}: client=${actionNumberParam}, db=${currentActionNumber}`,
                );
                // Returning undefined aborts the transaction and does NOT retry
                // We'll surface this as a stale_action_number error
                // (Firebase will not commit and result.committed will be false)
                return undefined;
              }

              const displayMessages = [...(currentData.messages || [])];
              const currentGame = redefineStrippedFields(currentData.game);

              const result = requestHandler({
                action,
                actionArgs: actionArgsParam,
                prevGame: currentGame,
                loggers: getEngineLoggers({ displayMessages }),
                seeds: seedsParam || undefined,
              });

              // This is what gets updated into the ref
              return {
                game: result.game,
                animationHints: result.animationHints || [],
                messages: displayMessages,
              };
            });

            // If not committed and currentData was null, retry (initial creation race)
            if (!result.committed && retries > 0 && result.snapshot?.val() === null) {
              logger.warn(
                `Transaction not committed for game ${gameIdParam} due to missing data, retrying (${retries} attempts left)`,
              );
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return executeTransaction(retries - 1);
            }

            // If not committed and currentData was present, check if it was due to actionNumber mismatch
            if (!result.committed && result.snapshot?.val() !== null) {
              // This means actionNumber mismatch or other abort (not retried)
              return { ...result, error: 'stale_action_number' };
            }

            // If not committed and out of retries, treat as game not found
            if (!result.committed && retries === 0) {
              return { ...result, error: 'game_not_found' };
            }

            return result;
          } catch (error) {
            logger.error(`Transaction error for game ${gameIdParam}: ${error}`);
            throw error;
          }
        };

        const result = await executeTransaction();

        if (!result.committed) {
          if (result.error === 'stale_action_number') {
            logger.warn(`Rejected request for game ${gameIdParam} due to stale actionNumber`);
            return { success: false, error: 'stale_action_number' };
          }
          if (result.error === 'game_not_found') {
            logger.error(`All transaction attempts failed for game ${gameIdParam}: game not found`);
            return { success: false, error: 'game_not_found' };
          }
          logger.error(`Transaction failed to commit for game ${gameIdParam}`);
          return { success: false, error: 'transaction_failed' };
        }

        // Caller doesn't need anything else as the updates will come from direct Realtime DB integration
        return { success: true };
      }
    } catch (e) {
      logger.error(e);
      return {
        success: false,
        error: JSON.stringify(e),
      };
    }
  },
);

/**
 * Cloud function specifically for logging client-side errors to Google Cloud Logging.
 * This provides better visibility into client-side errors in the Google Cloud Console.
 */
export const logClientError = onCall(
  { cors: ['https://drink.alexguo.co', 'http://localhost:5173'] },
  async (req) => {
    try {
      if (!req.auth) {
        throw new HttpsError('unauthenticated', 'Not signed in');
      }

      const { message, source, lineno, colno, stack, type, url, userAgent, timestamp } = req.data;

      const userId = req.auth.uid || 'anonymous';

      // Structure the log entry for better searchability in Cloud Logging
      logger.error('Client Error', {
        severity: 'ERROR',
        userId,
        errorType: type,
        message,
        source,
        lineno,
        colno,
        stack,
        userAgent,
        url,
        timestamp,
      });

      return { success: true };
    } catch (e) {
      logger.error('Error in logClientError function', e);
      return {
        success: false,
        error: JSON.stringify(e),
      };
    }
  },
);
