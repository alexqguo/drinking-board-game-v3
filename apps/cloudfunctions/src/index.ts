import { Game, getBoard, requestHandler } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { logger } from 'firebase-functions';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

interface DisplayMessage {
  msg: string;
}

interface RealtimeDbObject {
  game: Game;
  messages: DisplayMessage[];
}

interface CloudFunctionRequest {
  action: ActionType | 'getBoard';
  gameId: string;
  boardName: string;
  // eslint-disable-next-line
  actionArgs: any;
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
        boardName: boardNameParam,
        gameId: gameIdParam,
        action: actionParam,
        actionArgs: actionArgsParam,
      } = req.data;

      // TODO- remove this once lazy imports are setup
      if (actionParam === 'getBoard') {
        return {
          success: true,
          board: getBoard(boardNameParam).board,
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

        // Firebase transactions sometimes can't see newly created data
        // Use a retry approach that respects Firebase's transaction model
        const executeTransaction = async (
          retries = 3,
        ): Promise<{ committed: boolean; snapshot: any }> => {
          try {
            const result = await ref.transaction((currentData: RealtimeDbObject | null) => {
              if (!currentData) {
                logger.warn(
                  `Transaction couldn't access data for game ${gameIdParam}, attempt ${4 - retries}/3`,
                );
                // In Firebase transactions, returning null aborts the transaction
                return null;
              }

              const displayMessages = [...(currentData.messages || [])];
              const currentGame = redefineStrippedFields(currentData.game);

              const result = requestHandler({
                action,
                actionArgs: actionArgsParam,
                prevGame: currentGame,
                loggers: getEngineLoggers({ displayMessages }),
              });

              // This is what gets updated into the ref
              return {
                game: result.game,
                animationHints: result.animationHints || [],
                messages: displayMessages,
              };
            });

            // If not committed but we have retries left, try again
            if (!result.committed && retries > 0) {
              logger.warn(
                `Transaction not committed for game ${gameIdParam}, retrying (${retries} attempts left)`,
              );
              // Wait before retrying to give Firebase time to propagate data
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return executeTransaction(retries - 1);
            }

            return result;
          } catch (error) {
            if (retries > 0) {
              logger.warn(
                `Transaction error for game ${gameIdParam}, retrying (${retries} attempts left): ${error}`,
              );
              // Wait before retrying
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return executeTransaction(retries - 1);
            }
            throw error;
          }
        };

        const result = await executeTransaction();

        if (!result.committed) {
          logger.error(`All transaction attempts failed for game ${gameIdParam}`);
          throw new Error('Transaction failed to commit after multiple retries');
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
