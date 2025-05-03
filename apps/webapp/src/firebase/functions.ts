import { BoardModule, BoardSchema } from '@repo/schemas';
import { logEvent } from 'firebase/analytics';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { analytics, app } from './initialize';

const functions = getFunctions(app);

// Connect to emulator if running on localhost
if (window.location.origin.includes('localhost')) {
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

interface CFResponse {
  success: boolean;
  gameId?: string;
  board?: BoardSchema;
  error?: string;
  boardModules?: BoardModule[];
}

interface ErrorLogData {
  type: string;
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
}

export const gameRequest = httpsCallable<unknown, CFResponse>(functions, 'gameRequest');
export const logClientError = httpsCallable<ErrorLogData, { success: boolean }>(
  functions,
  'logClientError',
);

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
