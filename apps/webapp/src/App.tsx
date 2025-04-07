import { Route, Switch } from 'wouter';
import './firebase/initialize';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { JoinPage } from './pages/JoinPage';
import { ChakraProvider } from './providers/ChakraEnvironmentProvider';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/join" component={JoinPage} />
          <Route path="/games/:gameId">
            {({ gameId }) => <GamePage gameId={gameId} />}
          </Route>
          <Route>404: No such page!</Route>
        </Switch>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App
