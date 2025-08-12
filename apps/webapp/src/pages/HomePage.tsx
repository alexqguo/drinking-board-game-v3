import { HomePageUI } from '@repo/react-ui/components/homepage/HomePageUI.jsx';
import { useAppActionsRegistryInstance } from '@repo/react-ui/context/AppActionsContext.jsx';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import { gameRequest } from '../firebase/functions';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const HAS_VISITED_VALUE = 'true';
const hasVisited = getLocalStorage().__dbg_hasVisited === HAS_VISITED_VALUE;
const recordVisit = () => {
  setLocalStorage('__dbg_hasVisited', HAS_VISITED_VALUE);
};

export const HomePage = () => {
  const [, setLocation] = useLocation();
  const appActionsRegistry = useAppActionsRegistryInstance();

  const createAndJoinGame = useCallback(
    (board: string, playerNames: string[]): Promise<void> => {
      return new Promise((resolve, reject) => {
        gameRequest({
          action: 'gameCreate',
          actionArgs: {
            playerNames,
            board,
          },
        })
          .then((resp) => {
            console.info(`Game created. Redirecting to /games/${resp.data.gameId}`);
            setLocation(`/games/${resp.data.gameId}`);
            // No need to resolve here actually
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    },
    [setLocation],
  );

  useEffect(() => {
    appActionsRegistry.register('createAndJoinGame', createAndJoinGame);
  }, [appActionsRegistry, createAndJoinGame]);

  return <HomePageUI hasVisited={hasVisited} recordVisit={recordVisit} />;
};
