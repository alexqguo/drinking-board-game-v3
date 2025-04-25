import { BoardSchema } from '@repo/engine';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './initialize';

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
}

export const gameRequest = httpsCallable<unknown, CFResponse>(functions, 'gameRequest');
