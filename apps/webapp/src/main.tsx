import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { getLocalStorage, initializeLocalStorageIfEmpty, setLocalStorage } from './utils/localStorage';

(() => {
  initializeLocalStorageIfEmpty();
  const urlSearchParams = new URLSearchParams(window.location.search);

  // todo- make this more generic so you can set any LS thing through the URL
  if (urlSearchParams.get('isDebugMode') === 'true') {
      setLocalStorage('isDebugMode', 'true');
  }

  const isDebugMode = getLocalStorage().isDebugMode;

  if (!isDebugMode) {
    document.location.href = 'https://v2.drink.alexguo.co';
    return;
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();
