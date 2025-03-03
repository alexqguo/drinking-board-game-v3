import './firebase/initialize';
import { Route, Switch } from 'wouter';
import { HomePage } from './pages/Home';
import { CreatePage } from './pages/Create';
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
          <Route>404: No such page!</Route>
        </Switch>
      </UserProvider>
    </ChakraProvider>
  )
}

export default App
