import { ActionType } from '../../actions/actions.types.js';
import { Context } from '../../context.js';
import { GameState } from '../../gamestate/gamestate.types.js';
import { findGameStateHandler } from '../../gamestate/index.js';
import { BoardModule, BoardSchema } from '../boards.types.js';
import schema from './schema.json' assert { type: 'json' };

const starters = Object.freeze({
  pikachu: 'Pikachu',
  squirtle: 'Squirtle',
  bulbasaur: 'Bulbasaur',
  charmander: 'Charmander',
});

const starterStrengths = Object.freeze({
  [starters.pikachu]: starters.squirtle,
  [starters.squirtle]: starters.charmander,
  [starters.charmander]: starters.bulbasaur,
  [starters.bulbasaur]: starters.squirtle,
});

const trainerBattleRuleId = 'battle_gen1';

export const gen1: BoardModule = {
  board: schema as BoardSchema, // TODO- the fact that this complains maybe means the schema needs to be adjusted?

  gameExtensionInfo: {
    actions: {
      [ActionType.battle]: (ctx: Context) => ({
        execute: () => {
          ctx.loggers.debug('In Gen 1 battle action execute!');
        }
      }),
    },
    gameState: {
      [GameState.Battle]: (ctx: Context) => ({
        gameState: GameState.Battle,
        execute: () => {
          ctx.loggers.debug('In Gen 1 battle phase!');

          // ctx.update_setPlayerActions(
          //   ctx.currentPlayer.id,
          //   [{
          //     id: createId(),
          //     type: ActionType.battle
          //   }],
          // )
          // findGameStateHandler(ctx, GameState.RuleTrigger).execute();
          //todo
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