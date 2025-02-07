
/**
 *
 * how it works:
 * - engine is stateless. think of it almost as a pure function
 *   - call with input game state and action, receive updated output gate state
 *   - this should all be sync code
 *
 * - when invoked it accepts the entire game/player/alert state, along with whatever
 * action is being performed
 * - invokes appropriate event handler (which may in turn invoke other event handlers)
 * - how do we know an execution is completed?
 *   - only certain event handlers "resolve" I guess? is there a clearer way to track?
 *   - should the entire thing behave like a promise? there needs to be a singular exit point
 *     so the serialization logic/etc can all happen in one manageable place
 *   - how would the logger preserve order? would it need to if the loggers are passed in?
 *     - should be fine actually?
 *
 *
 * To solve:
 * - lots of updates could occur from one input, how can the CF only updates parts of the
 * db that changed as opposed to making small updates to entire objects which would be
 * inefficient from a realtime db perspective? does it matter? weird diffing algo on CF side?
 *
 */

import { getBoard } from './boards';
import { AlertModel } from './model/alert';
import { BoardModel } from './model/board';
import { GameModel } from './model/game';
import { PlayerModel } from './model/players';

interface Arguments {
  // todo- change this to SessionData?
  prevState: {
    players: PlayerData
    game: GameData,
    alert: Alert,
  },

  // Maybe?
  onComplete: (/* finalGameState */) => void,

  logger: {
    display: () => void,
    debug: () => void,
    error: () => void,
  }
}

interface RootModel {
  gameModel: GameModel,
  playerModel: PlayerModel,
  alertModel: AlertModel,
  boardModel: BoardModel,
}

const gameEventHandler = ({
  prevState,
  onComplete,
  logger,
}: Arguments) => {
  const { game, players, alert } = prevState;
  const boardModule = getBoard(game.board);

  const rootModel: RootModel = {
    gameModel: GameModel.fromJSON(game),
    playerModel: PlayerModel.fromJSON(players),
    alertModel: AlertModel.fromJSON(alert),
    boardModel: BoardModel.fromJSON(boardModule.board),
  };
  const { gameModel, playerModel, alertModel, boardModel } = rootModel;

  // Utility for event handlers
  const currentPlayerId = gameModel.data.currentPlayerId;
  const currentPlayer = playerModel.data[currentPlayerId];

  // todo- key: gamestate?
  const eventHandlers: ({ [key: string]: Function }) = {
    // done
    [GameState.NOT_STARTED]: () => {},
    [GameState.GAME_START]: () => {
      onEvent(GameState.TURN_CHECK);
    },
    [GameState.TURN_CHECK]: () => {
      if (currentPlayer?.hasWon) {
        onEvent(GameState.TURN_END);
      } else {
        onEvent(GameState.ZONE_CHECK);
      }
    },
    [GameState.TURN_START]: () => {
      const isSkipped = currentPlayer!.effects.skippedTurns.numTurns > 0;

      if (isSkipped) {
        onEvent(GameState.LOST_TURN_START);
      } else {
        const { moveCondition } = currentPlayer!.effects;
        const conditionSchema = boardModel.rulesById.get(moveCondition.ruleId)?.condition;

        if (
          conditionSchema?.diceRolls?.numRequired
          && conditionSchema?.diceRolls?.numRequired > 1
        ) {
          /**
           * If player has a move condition, and the ruleId of the condition is a multi roll:
           * - This means you need to roll multiple times to determine if you can even take your turn
           *   - Used for elite four and legendary birds
           *   - Arguably it's not really a move condition, it's more of a turn condition
           *   - (maybe create a different rule type for this in the future)
           */
          onEvent(GameState.TURN_MULTIROLL_CONDITION_CHECK);
        } else {
          onEvent(GameState.ROLL_START);
        }
      }
    },

    // not done
    [GameState.ZONE_CHECK]: () => {
      const schema = boardModule.board;
      const { tiles, zones } = schema;
      const currentTile = tiles[currentPlayer!.tileIndex];
      const currentZone = zones.find((z: ZoneSchema) => z.name === currentTile?.zone);

      // If current player is in an active zone
      if (currentZone?.rule && currentZone.type === ZoneType.active) {
        // todo- get rule handler and trigger alert
/*
        const handler: RuleHandler = getHandlerForRule(currentZone.rule);
        await alertStore.update({
          open: true,
          state: AlertState.PENDING,
          nextGameState: GameState.TURN_START,
          ruleId: currentZone.rule.id,
        });
        handler(currentZone.rule);
*/
      } else {
        onEvent(GameState.TURN_START)
      }
    },
    [GameState.STARTER_SELECT]: () => {},

    [GameState.TURN_MULTIROLL_CONDITION_CHECK]: () => {},
    [GameState.ROLL_START]: () => {},
    [GameState.ROLL_END]: () => {},
    [GameState.MOVE_CALCULATE]: () => {},
    [GameState.MOVE_START]: () => {},
    [GameState.MOVE_END]: () => {},
    [GameState.RULE_TRIGGER]: () => {},
    [GameState.RULE_END]: () => {},
    [GameState.TURN_END]: () => {},
    [GameState.GAME_OVER]: () => {},
    [GameState.TURN_SKIP]: () => {},
    [GameState.LOST_TURN_START]: () => {},
    [GameState.BATTLE]: () => {},
  };

  const animationHandlers: ({ [key: string]: Function }) = {
    // TODO- define animation handlers
  }

  // TODO- extension check

  const onEvent = (nextGameState: GameState) => {
    if (nextGameState === prevState.game.state) {
      return;
    }

    // TODO- animation handler

    const handler = eventHandlers[nextGameState];
    if (handler) handler();
  };
};
