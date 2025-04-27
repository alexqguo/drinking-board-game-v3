import { getAnalytics, logEvent } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { logClientError } from './functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCEjutJ_ii_pOS1UnXx-G4VG_fv6j0jkzk',
  authDomain: 'alexguo-drinking-board-game-v3.firebaseapp.com',
  databaseURL: 'https://alexguo-drinking-board-game-v3-default-rtdb.firebaseio.com',
  projectId: 'alexguo-drinking-board-game-v3',
  storageBucket: 'alexguo-drinking-board-game-v3.firebasestorage.app',
  messagingSenderId: '583174976430',
  appId: '1:583174976430:web:8e1f25527fa22ad3f08e3f',
  measurementId: 'G-MRM7YCRLEQ',
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Error handler that logs to both Google Cloud Logging and Google Analytics
const handleError = (errorData: {
  type: string;
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  url: string;
}) => {
  // Add common metadata
  const enrichedErrorData = {
    ...errorData,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  // 1. Log to Google Cloud Logging via our Cloud Function
  logClientError(enrichedErrorData).catch((err) => {
    console.error('Failed to send error to Cloud Logging:', err);
  });

  // 2. Log to Google Analytics
  logEvent(analytics, 'exception', {
    description: errorData.message,
    fatal: true,
    source: errorData.source,
    stack_trace: errorData.stack,
  });

  // 3. Log to console for local debugging
  console.error('[CLIENT_ERROR_LOGGED]', enrichedErrorData);
};

// Override window.onerror to capture JavaScript errors
const originalOnError = window.onerror;
window.onerror = function (
  message: string | Event,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error,
): boolean {
  // Create error data object
  const errorData = {
    type: 'uncaught_exception',
    message: String(message),
    source: source || window.location.href,
    lineno: lineno,
    colno: colno,
    stack: error?.stack,
    url: window.location.href,
  };

  // Log the error
  handleError(errorData);

  // Call original error handler if it exists
  if (typeof originalOnError === 'function') {
    return originalOnError(message, source, lineno, colno, error);
  }

  // Return false to allow default browser error handling
  return false;
};

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;

  // Create error data object
  const errorData = {
    type: 'unhandled_promise_rejection',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    url: window.location.href,
  };

  // Log the error
  handleError(errorData);
});
