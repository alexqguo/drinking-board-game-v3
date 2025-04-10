import type { Game } from '@repo/engine';
import { createContext, useContext, useMemo } from 'react';
import { useUI } from './UIEnvironmentContext';

interface GameContextValue {
  game: Game | null;
}

interface Props {
  game: Game | null;
  isLoading: boolean;
  children: React.ReactNode;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ game, isLoading, children }: Props) => {
  const ui = useUI();
  const value = useMemo(() => ({
    game: game
  }), [game]);

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