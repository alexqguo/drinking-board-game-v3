import { Game } from '@repo/engine';
import {
  DataSnapshot,
  Database,
  connectDatabaseEmulator,
  get,
  getDatabase,
  onValue,
  ref,
} from 'firebase/database';
import { app } from './initialize';

interface RealtimeDbObject {
  game: Game;
  messages: { msg: string }[];
}

const database: Database = getDatabase(app);

// Connect to emulator if running locally
if (window.location.origin.includes('localhost')) {
  // Assuming standard port 9000 for realtime database emulator
  connectDatabaseEmulator(database, '127.0.0.1', 9000);
}

export const subscribeToGame = (
  gameId: string,
  onGameUpdate: (game: Game | null) => void,
  onError?: (error: Error) => void
) => {
  const gameRef = ref(database, `games/${gameId}`);

  const unsubscribe = onValue(
    gameRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val() as RealtimeDbObject | null;
      if (!data) {
        onGameUpdate(null);
        return;
      }
      onGameUpdate(data.game);
    },
    error => {
      console.error('Error subscribing to game:', error);
      onError?.(error);
    }
  );

  return unsubscribe;
};

export const getGameRef = (gameId: string) => {
  return ref(database, `games/${gameId}`);
};

export const getGame = async (gameId: string): Promise<Game | null> => {
  const gameRef = ref(database, `games/${gameId}`);
  const snapshot = await get(gameRef);
  const data = snapshot.val() as RealtimeDbObject | null;
  return data?.game || null;
};
