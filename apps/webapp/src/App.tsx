import { ErrorPage } from '@repo/react-ui/components/error/ErrorPage.jsx';
import { AnimationProvider } from '@repo/react-ui/context/AnimationContext.jsx';
import { Route, Switch } from 'wouter';
import './firebase/initialize';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { JoinPage } from './pages/JoinPage';
import { ChakraProvider } from './providers/ChakraEnvironmentProvider';
import { FirebaseUserProvider } from './providers/FirebaseUserProvider';
import { I18nProvider } from './providers/I18nProvider';

function App() {
  return (
    <I18nProvider>
      <ChakraProvider>
        <FirebaseUserProvider>
          <AnimationProvider>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/join" component={JoinPage} />
              <Route path="/games/:gameId">{({ gameId }) => <GamePage gameId={gameId} />}</Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </AnimationProvider>
        </FirebaseUserProvider>
      </ChakraProvider>
    </I18nProvider>
  );
}

export default App;
