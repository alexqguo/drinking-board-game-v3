import type { BoardSchema, Game, Payloads } from '@repo/engine';
import { createI18n } from '@repo/i18n';
import { createContext, useContext, useMemo } from 'react';
import { I18n } from './LocalizationContext';
import { useUI } from './UIEnvironmentContext';

type GameActionHandler = <T extends keyof Payloads>(action: T, actionArgs: Payloads[T]) => Promise<void>;

interface GameContextValue {
  game: Game | null;
  board: BoardSchema | null;
  boardI18n: I18n | null;
  gameActionHandler: GameActionHandler;
}

interface Props {
  board: BoardSchema | null;
  game: Game | null;
  redirectTo404Page: () => void;
  gameActionHandler: GameActionHandler;
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({
  game,
  board,
  error,
  isLoading,
  children,
  gameActionHandler,
}: Props) => {
  const ui = useUI();
  const value = useMemo(() => ({
    game,
    board,
    gameActionHandler,
    boardI18n: createI18n(board?.i18n.en || {})
  }), [game, gameActionHandler, board]);

  // TODO - update this
  if (error) {
    return <div>Error! {JSON.stringify(error)}</div>
  }

  return (
    <GameContext.Provider value={value}>
      {isLoading ? (<ui.Spinner size="l" />) : children}
    </GameContext.Provider>
  );
}

// Game hooks
type GameSelector<T> = (game: Game) => T;
export function useCurrentGame(): Game;
export function useCurrentGame<T>(selector: GameSelector<T>): T;
export function useCurrentGame<T>(selector?: GameSelector<T>): Game | T {
  const context = useContext(GameContext);
  if (!context) throw new Error('useCurrentGame must be used within a GameProvider');

  const { game } = context;
  return useMemo(() => {
    if (!game) return {} as Game;
    if (!selector) return game;
    return selector(game);
  }, [game, selector]);
}
export const useCurrentPlayers = () => useCurrentGame(g => g.players);
export const useCurrentActions = () => useCurrentGame(g => g.availableActions);

// Board hooks
type BoardSelector<T> = (board: BoardSchema) => T;
export function useCurrentBoard(): BoardSchema;
export function useCurrentBoard<T>(selector: BoardSelector<T>): T;
export function useCurrentBoard<T>(selector?: BoardSelector<T>): BoardSchema | T {
  const context = useContext(GameContext);
  if (!context) throw new Error('useCurrentBoard must be used within a GameProvider');

  const { board } = context;
  return useMemo(() => {
    if (!board) return {} as BoardSchema;
    if (!selector) return board;
    return selector(board);
  }, [board, selector]);
}

export const useBoardI18n = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useBoardI18n must be used within a GameProvider');

  return useMemo(() => context.boardI18n!, [context.boardI18n]);
}

// Action handler hooks
export const useGameActionHandler = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameActionHandler must be used within a GameProvider');

  return useMemo(() => context.gameActionHandler, [context.gameActionHandler]);
};
