import { ActionType } from '../../actions/actions.types.js';
import { PromptActionCommonArguments } from '../../actions/promptActionCommon.js';
import { Context } from '../../context.js';
import { GameState } from '../../gamestate/gamestate.types.js';
import { findGameStateHandler } from '../../gamestate/index.js';
import { createNActionObjects } from '../../utils/actions.js';
import { BoardModule, BoardSchema } from '../boards.types.js';
import schema from './schema.json' assert { type: 'json' };

const starterStrengths = Object.freeze({
  starter_pikachu: 'starter_squirtle',
  starter_squirtle: 'starter_charmander',
  starter_charmander: 'starter_bulbasaur',
  starter_bulbasaur: 'starter_squirtle',
});
const allStarters = new Set(Object.keys(starterStrengths));

const getBattleResults = (
  ctx: Context
): {
  winnerPlayerIds: string[],
  loserPlayerIds: string[]
} => {
  const { nextGame, allPromptActions } = ctx;
  const loserPlayerIds: string[] = [];
  const winnerPlayerIds: string[] = [];
  const maxRoll: number = Math.max(...allPromptActions
    .filter(a => a.type === ActionType.battleRoll)
    .map(a => a.result as number));

  for (const [pid, actionsForPlayer] of Object.entries(nextGame.availableActions)) {
    const { promptActions } = actionsForPlayer;
    const battleRollActions = promptActions.filter(a => a.type === ActionType.battleRoll);
    const playerMax = Math.max(...battleRollActions.map(a => a.result as number));
    if (playerMax === maxRoll) {
      winnerPlayerIds.push(pid);
    } else {
      loserPlayerIds.push(pid);
    }
  }

  return { winnerPlayerIds, loserPlayerIds };
}

export const gen1: BoardModule = {
  board: schema as BoardSchema, // TODO- the fact that this complains maybe means the schema needs to be adjusted?

  gameExtensionInfo: {
    actions: {
      [ActionType.battleRoll]: () => ({
        execute: (ctx, args: PromptActionCommonArguments) => {
          ctx.loggers.debug('In Gen 1 battle action execute!');
          const { actionId } = args;

          // First, update action properly
          ctx.update_setActionResult(actionId, ctx.rollDie());

          if (ctx.arePromptActionsCompleted) {
            const { winnerPlayerIds, loserPlayerIds } = getBattleResults(ctx);
            const winnerNames = winnerPlayerIds.map(pid => ctx.nextGame.players[pid]?.name);
            const loserNames = loserPlayerIds.map(pid => ctx.nextGame.players[pid]?.name);

            ctx.update_setGamePromptPartial({
              messageOverride: `TODO-i18n ${winnerNames.join(', ')} won, ${loserNames.join(', ')} lost`,
            });
            ctx.update_setPromptActionsClosable();
          }
        },
        prevalidate: (ctx, args) => {
          const { result, actionId } = args;
          const actionToUpdate = ctx.allActions.find(a => a.id === actionId);

          if (typeof actionToUpdate?.result !== 'undefined') {
            const msg = `There is already a result for this action: ${result}`;
            ctx.loggers.error(msg);
            throw new Error(msg);
          }
        }
      }),
    },
    gameState: {
      [GameState.Battle]: (ctx: Context) => ({
        gameState: GameState.Battle,
        execute: () => {
          const { nextGame, currentPlayer } = ctx;
          ctx.loggers.debug('In Gen 1 battle phase!');
          const currentIdx = currentPlayer.tileIndex;
          const playersAtCurrentTile = Object.values(nextGame.players)
            .filter(p => p.tileIndex === currentIdx);
          const pokemonAtCurrentTile = new Set(playersAtCurrentTile.map(p => p.effects.itemIds).flat());

          // Clear out actions for upcoming battle
          ctx.update_clearActions();

          playersAtCurrentTile.forEach(p => {
            const starter = p.effects.itemIds.find(i => allStarters.has(i));
            const weakPokemon = starterStrengths[starter as keyof typeof starterStrengths];
            const hasStrength = pokemonAtCurrentTile.has(weakPokemon);
            const actionsForUser = createNActionObjects({
              n: hasStrength ? 2 : 1,
              type: ActionType.battleRoll,
              playerId: p.id,
            });
            // todo^ this is just a dice roll, but should it be a battle type?

            ctx.update_setPlayerActions(
              p.id,
              actionsForUser
            );
          });

          ctx.update_setGamePrompt({
            nextGameState: GameState.RuleTrigger,
            messageOverride: 'TODO-i18n Battle!'
          });
        }
      }),
      [GameState.MoveEnd]: (ctx: Context) => ({
        gameState: GameState.MoveEnd,
        execute: () => {
          ctx.loggers.debug('In Gen 1 moveend phase!');
          const currentIdx = ctx.currentPlayer.tileIndex;
          const currentTile = ctx.boardHelper.module.board.tiles[currentIdx];
          const playersAtCurrentTile = Array.from(ctx.sortedPlayers)
            .filter(p => p.tileIndex === currentIdx);

          if (playersAtCurrentTile.length > 1 && !currentTile?.mandatory) {
            findGameStateHandler(ctx, GameState.Battle).execute();
          } else {
            findGameStateHandler(ctx, GameState.RuleTrigger).execute();
          }
        }
      })
    },
  }
};