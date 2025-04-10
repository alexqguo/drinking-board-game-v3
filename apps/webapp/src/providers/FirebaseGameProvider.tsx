import { Game } from '@repo/engine';
import { GameProvider } from '@repo/react-ui/context/GameContext';
import { useEffect, useState } from 'react';
import { subscribeToGame } from '../firebase/database';

interface Props {
  gameId: string,
  children: React.ReactNode
}

export const FirebaseGameProvider = ({ gameId, children }: Props) => {
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <GameProvider game={game} isLoading={isLoading}>
      {children}
    </GameProvider>
  );
}