import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeLocalStorageIfEmpty } from './utils/localStorage';

(() => {
  initializeLocalStorageIfEmpty();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();
