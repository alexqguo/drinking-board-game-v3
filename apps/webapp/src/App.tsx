import { Route, Switch } from 'wouter';
import './firebase/initialize';
import { CreatePage } from './pages/Create';
import { GamePage } from './pages/Game';
import { HomePage } from './pages/Home';
import { JoinPage } from './pages/Join';
import { ChakraProvider } from './providers/ChakraEnvironmentProvider';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
   <ChakraProvider>
    <UserProvider>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/join" component={JoinPage} />
          <Route path="/games/:gameId">
            {({ gameId }) => <GamePage gameId={gameId} />}
          </Route>
          <Route>404: No such page!</Route>
        </Switch>
      </UserProvider>
    </ChakraProvider>
  )
}

export default App
