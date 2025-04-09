import type { Game } from '@repo/engine';
import { createContext, useContext, useMemo } from 'react';

interface GameContextValue {
  game: Game | null;
}

interface Props {
  game: Game | null,
  children: React.ReactNode,
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ game, children }: Props) => {
  const value = useMemo(() => ({
    game
  }), [game]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

type Selector<T> = (game: Game) => T;

export function useCurrentGame(): Game | null;
export function useCurrentGame<T>(selector: Selector<T>): T | null;
export function useCurrentGame<T>(selector?: Selector<T>): Game | T | null {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useCurrentGame must be used within a GameProvider');
  }

  const { game } = context;

  return useMemo(() => {
    if (!game) return null;
    if (!selector) return game;
    return selector(game);
  }, [game, selector]);
}