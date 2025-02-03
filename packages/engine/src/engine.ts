
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

import { AlertModel } from './model/alert';
import { GameModel } from './model/game';
import { PlayerModel } from './model/players';

interface Arguments {
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

const gameEventHandler = ({
  prevState,
  onComplete,
  logger,
}: Arguments) => {
  const { game, players, alert } = prevState;
  const gameModel = GameModel.fromJSON(game);
  const playerModel = PlayerModel.fromJSON(players);
  const alertModel = AlertModel.fromJSON(alert);
  // todo- fetch board

  // todo- key: gamestate?
  const eventHandlers: ({ [key: string]: Function }) = {
    // done
    [GameState.NOT_STARTED]: () => {},
    [GameState.GAME_START]: () => {
      onEvent(GameState.TURN_CHECK);
    },
    [GameState.TURN_CHECK]: () => {
      const currentPlayerId = gameModel.data.currentPlayerId;
      const currentPlayer = playerModel.data[currentPlayerId];

      if (currentPlayer?.hasWon) {
        onEvent(GameState.TURN_END);
      } else {
        onEvent(GameState.ZONE_CHECK);
      }
    },
    [GameState.ZONE_CHECK]: () => {

    },

    // not done
    [GameState.STARTER_SELECT]: () => {},
    [GameState.TURN_START]: () => {},
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
