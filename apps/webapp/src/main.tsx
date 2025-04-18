import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

(() => {
  let isDebugMode = false;

  try {
    const value = window.localStorage.getItem('__dbg');
    const parsed = JSON.parse(value || '{}');
    isDebugMode = parsed.isDebugMode;
    // eslint-disable-next-line
  } catch (e) {}

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
