import { ErrorPage } from '@repo/react-ui/components/error/ErrorPage.jsx';
import { AnimationProvider } from '@repo/react-ui/context/AnimationContext.jsx';
import {
  AppActionsProvider,
  appActionsRegistry,
} from '@repo/react-ui/context/AppActionsContext.jsx';
import { BoardMetadata } from '@repo/schemas';
import { Route, Switch } from 'wouter';
import { debugMovePlayer } from './firebase/database';
import { gameRequest } from './firebase/functions';
import './firebase/initialize';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { FirebaseUserProvider } from './providers/FirebaseUserProvider';
import { I18nProvider } from './providers/I18nProvider';
import { WebappUIProvider } from './providers/WebappUIProvider';

const listGames = (): Promise<BoardMetadata[]> => {
  return new Promise((resolve, reject) => {
    gameRequest({
      action: 'listBoards',
      actionArgs: {},
    })
      .then((response) => {
        resolve(response.data.boardMetadatas || []);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const memoOne = <T,>(fn: () => T) => {
  let response: T | undefined;
  return (): T => {
    if (response === undefined) {
      response = fn();
    }
    return response;
  };
};

appActionsRegistry.register('listGames', memoOne(listGames));
appActionsRegistry.register('getMediaPaths', () => ({
  beerMug: 'mug.png',
  beerCan: 'can.png',
}));

// Expose debug functions globally in development
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__dbg_movePlayerTo = (playerIdOrName: string, tileIndex: number) => {
    // Extract gameId from URL path like /games/gameId123
    const pathParts = window.location.pathname.split('/');
    const gameId = pathParts[2]; // /games/{gameId}

    if (!gameId) {
      console.error(
        "[DEBUG] No game ID found in URL. Make sure you're on a game page (/games/...)",
      );
      return;
    }

    return debugMovePlayer(gameId, playerIdOrName, tileIndex);
  };
}

function App() {
  return (
    <I18nProvider>
      <AppActionsProvider>
        <WebappUIProvider>
          <FirebaseUserProvider>
            <AnimationProvider>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/games/:gameId">{({ gameId }) => <GamePage gameId={gameId} />}</Route>
                <Route>
                  <ErrorPage />
                </Route>
              </Switch>
            </AnimationProvider>
          </FirebaseUserProvider>
        </WebappUIProvider>
      </AppActionsProvider>
    </I18nProvider>
  );
}

export default App;
