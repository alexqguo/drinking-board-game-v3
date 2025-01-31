import { Route, Switch } from "wouter";
import { HomePage } from './pages/Home';
import { CreatePage } from './pages/Create';
import { JoinPage } from './pages/Join';
import { Provider } from '@repo/ui/provider';


function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/join" component={JoinPage} />
        <Route>404: No such page!</Route>
      </Switch>
    </Provider>
  )
}

export default App
