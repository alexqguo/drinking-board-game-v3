import type { Game, Payloads } from '@repo/engine';
import { useAnimation } from '@repo/react-ui/context/AnimationContext.jsx';
import { GameProvider } from '@repo/react-ui/context/GameContext.jsx';
import { BoardSchema } from '@repo/schemas';
import { useEffect, useRef, useState } from 'react';
import { monitorFirebaseConnection, subscribeToGameData } from '../firebase/database';
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
  const [isConnected, setIsConnected] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Define action handler function
  const gameActionHandler = <T extends keyof Payloads>(action: T, actionArgs: Payloads[T]) => {
    return new Promise<void>((resolve, reject) => {
      gameRequest({
        gameId,
        action,
        actionArgs,
        actionNumber: game?.actionNumber,
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

  // Monitor Firebase connection state
  useEffect(() => {
    const unsubscribe = monitorFirebaseConnection((connected) => {
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  // Handle game subscription with reconnection support
  useEffect(() => {
    const setupSubscription = () => {
      // Clean up existing subscription if present
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      const unsubscribe = subscribeToGameData(
        gameId,
        async (game, animationHints) => {
          if (!game) {
            setError(new Error('Game not found'));
          } else {
            await playAnimations(animationHints);
            setGame(game);
            // When we successfully receive game data after a connection change,
            // clear any existing error since we're now successfully connected
            if (error && isConnected) {
              setError(null);
            }
          }
        },
        (error) => setError(error),
      );

      unsubscribeRef.current = unsubscribe;
      return unsubscribe;
    };

    const unsubscribe = setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [gameId, playAnimations, isConnected, error]); // Re-subscribe when connection state changes

  // Fetch board information once initial game loads
  useEffect(() => {
    if (game?.metadata.board) {
      setIsLoading(true);
      // Careful here only to load the schema. If you load the whole module then the entire engine comes along with it
      import(`@boards/${game.metadata.board}/schema.json`)
        .then((schema) => {
          setBoard(schema);
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
