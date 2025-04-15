import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const value = window.localStorage.getItem('__dbg');
    try {
      const parsed = JSON.parse(value || '{}');
      if (!parsed.isDebugMode) {
        document.location.href = 'https://v2.drink.alexguo.co';
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

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
