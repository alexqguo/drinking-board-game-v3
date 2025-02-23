import { ActionType } from '../../actions/actions.types.js';
import { Context } from '../../context.js';
import { GameState } from '../../gamestate/gamestate.types.js';
import { findGameStateHandler } from '../../gamestate/index.js';
import { createNDiceRollActionObjects } from '../../utils/actions.js';
import { BoardModule, BoardSchema } from '../boards.types.js';
import schema from './schema.json' assert { type: 'json' };

const starterStrengths = Object.freeze({
  starter_pikachu: 'starter_squirtle',
  starter_squirtle: 'starter_charmander',
  starter_charmander: 'starter_bulbasaur',
  starter_bulbasaur: 'starter_squirtle',
});
const allStarters = new Set(Object.keys(starterStrengths));

const trainerBattleRuleId = 'battle_gen1';

/*
const getBattleResults = (actions: AlertAction[]): { winners: Player[], losers: Player[] } => {
  const losers: Player[] = [];
  const winners: Player[] = [];
  const maxRoll = Math.max(...actions.map(a => Number(a.value)));
  const resultsPerPlayer = actions.reduce((acc: { [key: string]: number[] }, cur: AlertAction) => {
    if (!acc[cur.playerId]) acc[cur.playerId] = [];
    acc[cur.playerId].push(Number(cur.value));
    return acc;
  }, {});

  Object.keys(resultsPerPlayer).forEach((playerId: string) => {
    const playerMax = Math.max(...resultsPerPlayer[playerId]);
    const player = playerStore.players.get(playerId)!;

    if (playerMax === maxRoll) {
      winners.push(player);
    } else {
      losers.push(player);
    }
  });

  return { winners, losers };
}
*/

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
          const { nextGame, currentPlayer } = ctx;
          ctx.loggers.debug('In Gen 1 battle phase!');
          const currentIdx = currentPlayer.tileIndex;
          const playersAtCurrentTile = Object.values(nextGame.players)
            .filter(p => p.tileIndex === currentIdx);
          const pokemonAtCurrentTile = new Set(playersAtCurrentTile.map(p => p.effects.starter));

          playersAtCurrentTile.forEach(p => {
            const starter = p.effects.itemIds.find(i => allStarters.has(i));
            const weakPokemon = starterStrengths[starter as keyof typeof starterStrengths];
            const hasStrength = pokemonAtCurrentTile.has(weakPokemon);
            const actionsForUser = createNDiceRollActionObjects({
              n: hasStrength ? 2 : 1,
            });
            // todo^ this is just a dice roll, but should it be a battle type?

            ctx.update_setPlayerActions(
              p.id,
              actionsForUser
            );
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