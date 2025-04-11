import type { Game, Payloads } from '@repo/engine';
import { createContext, useContext, useMemo } from 'react';
import { useUI } from './UIEnvironmentContext';

type GameActionHandler = <T extends keyof Payloads>(action: T, actionArgs: Payloads[T]) => Promise<void>;

interface GameContextValue {
  game: Game | null;
  gameActionHandler: GameActionHandler;
}

interface Props {
  game: Game | null;
  gameActionHandler: GameActionHandler;
  isLoading: boolean;
  children: React.ReactNode;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ game, isLoading, children, gameActionHandler }: Props) => {
  const ui = useUI();
  const value = useMemo(() => ({
    game: game,
    gameActionHandler,
  }), [game, gameActionHandler]);

  return (
    <GameContext.Provider value={value}>
      {isLoading ? (<ui.Spinner size="l" />) : children}
    </GameContext.Provider>
  );
}

type Selector<T> = (game: Game) => T;

export function useCurrentGame(): Game;
export function useCurrentGame<T>(selector: Selector<T>): T;
export function useCurrentGame<T>(selector?: Selector<T>): Game | T {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useCurrentGame must be used within a GameProvider');
  }

  const { game } = context;

  return useMemo(() => {
    if (!game) return {} as Game;
    if (!selector) return game;
    return selector(game);
  }, [game, selector]);
}

export const useGameActionHandler = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameActionHandler must be used within a GameProvider');
  }

  return useMemo(() => context.gameActionHandler, [context.gameActionHandler]);
};

export const useCurrentPlayers = () => useCurrentGame(g => g.players);