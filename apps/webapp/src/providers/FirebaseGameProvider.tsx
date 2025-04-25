import type { BoardSchema, Game, Payloads } from '@repo/engine';
import { useAnimation } from '@repo/react-ui/context/AnimationContext.jsx';
import { GameProvider } from '@repo/react-ui/context/GameContext.jsx';
import { useEffect, useState } from 'react';
import { subscribeToGameData } from '../firebase/database';
import { gameRequest } from '../firebase/functions';

interface Props {
  gameId: string;
  children: React.ReactNode;
}

export const FirebaseGameProvider = ({ gameId, children }: Props) => {
  const { playAnimations } = useAnimation();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState<BoardSchema | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Define action handler function
  const gameActionHandler = <T extends keyof Payloads>(action: T, actionArgs: Payloads[T]) => {
    return new Promise<void>((resolve, reject) => {
      gameRequest({
        gameId: game?.metadata.id,
        action,
        actionArgs,
      })
        .then((resp) => {
          console.info('Game action executed', resp);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          reject(err);
        });
    });
  };

  // Subscribe to the game
  useEffect(() => {
    const unsubscribe = subscribeToGameData(
      gameId,
      async (game, animationHints) => {
        if (!game) {
          setError(new Error('Game not found'));
        } else {
          await playAnimations(animationHints);
          setGame(game);
        }
      },
      (error) => setError(error),
    );

    return () => unsubscribe();
  }, [gameId, playAnimations]);

  // Fetch board information once initial game loads
  useEffect(() => {
    if (game?.metadata.board) {
      gameRequest({
        action: 'getBoard',
        boardName: game?.metadata.board,
      })
        .then((resp) => {
          if (!resp.data.success) {
            throw new Error('Board not found: ' + resp.data.error);
          }
          setBoard(resp.data.board as BoardSchema);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [game?.metadata.board]);

  return (
    <GameProvider
      game={game}
      board={board}
      error={error}
      isLoading={isLoading}
      gameActionHandler={gameActionHandler}
    >
      {children}
    </GameProvider>
  );
};
