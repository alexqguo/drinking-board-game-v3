import { Route, Switch } from 'wouter';
import './firebase/initialize';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { JoinPage } from './pages/JoinPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ChakraProvider } from './providers/ChakraEnvironmentProvider';
import { FirebaseUserProvider } from './providers/FirebaseUserProvider';
import { I18nProvider } from './providers/I18nProvider';

function App() {
  return (
    <I18nProvider>
      <ChakraProvider>
        <FirebaseUserProvider>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/join" component={JoinPage} />
            <Route path="/games/:gameId">
              {({ gameId }) => <GamePage gameId={gameId} />}
            </Route>
            <Route path="/404" component={NotFoundPage} />
            <Route>404: No such page!</Route>
          </Switch>
        </FirebaseUserProvider>
      </ChakraProvider>
    </I18nProvider>
  );
}

export default App
