import type { BoardSchema, Game, Payloads } from '@repo/engine';
import { GameProvider } from '@repo/react-ui/context/GameContext.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { subscribeToGame } from '../firebase/database';
import { gameRequest } from '../firebase/functions';

interface Props {
  gameId: string,
  children: React.ReactNode
}

export const FirebaseGameProvider = ({ gameId, children }: Props) => {
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState<BoardSchema | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [, setLocation] = useLocation();

  const goTo404Page = () => setLocation('/404');

  // Action handler
  const gameActionHandler = <T extends keyof Payloads>(
    action: T,
    actionArgs: Payloads[T]
  ) => {
    return new Promise<void>((resolve, reject) => {
      gameRequest({
        gameId: game?.metadata.id,
        action,
        actionArgs
      })
        .then(resp => {
          console.log('asdf Game action executed', resp);
          resolve();
        })
        .catch(err => {
          console.error(err);
          setError(err);
          reject(err);
        });
    });
  };

  // Subscribe to the game
  useEffect(() => {
    const unsubscribe = subscribeToGame(
      gameId,
      (game) => {
        if (!game) {
          setError(new Error('Game not found'))
        } else {
          setGame(game);
        }
      },
      (error) => setError(error)
    );

    return () => unsubscribe();
  }, [gameId]);

  useEffect(() => {
    if (game?.metadata.board) {
      gameRequest({
        action: 'getBoard',
        boardName: game?.metadata.board
      }).then(resp => {
        if (!resp.data.success) {
          throw new Error('Board not found: ' + resp.data.error);
        }
        setBoard(resp.data.board as BoardSchema);
      }).catch(err => {
        console.error(err);
        setError(err);
      }).finally(() => setIsLoading(false));
    }
  }, [game?.metadata.board]);

  return (
    <GameProvider
      game={game}
      board={board}
      error={error}
      isLoading={isLoading}
      gameActionHandler={gameActionHandler}
      redirectTo404Page={goTo404Page}
    >
      {children}
    </GameProvider>
  );
}