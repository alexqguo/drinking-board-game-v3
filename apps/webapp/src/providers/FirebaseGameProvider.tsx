import type { Game, Payloads } from '@repo/engine';
import { GameProvider } from '@repo/react-ui/context/GameContext';
import { useEffect, useState } from 'react';
import { subscribeToGame } from '../firebase/database';
import { gameRequest } from '../firebase/functions';

interface Props {
  gameId: string,
  children: React.ReactNode
}

export const FirebaseGameProvider = ({ gameId, children }: Props) => {
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          reject(err);
        });
    });
  };

  useEffect(() => {
    const unsubscribe = subscribeToGame(
      gameId,
      (game) => {
        setGame(game)
        setIsLoading(false);
      },
      (error) => setError(error)
    );

    return () => unsubscribe();
  }, [gameId]);

  if (error) {
    // todo- update
    return <div>Error loading game: {error.message}</div>;
  }

  return (
    <GameProvider game={game} isLoading={isLoading} gameActionHandler={gameActionHandler}>
      {children}
    </GameProvider>
  );
}