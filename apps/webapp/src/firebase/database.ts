import type { AnimationHint, Game } from '@repo/engine';
import { Message } from '@repo/react-ui/context/MessagesContext.jsx';
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
  messages: Message[];
  animationHints: AnimationHint[];
}

const database: Database = getDatabase(app);

// Connect to emulator if running locally
if (window.location.origin.includes('localhost')) {
  // Assuming standard port 9000 for realtime database emulator
  connectDatabaseEmulator(database, '127.0.0.1', 9000);
}

export const subscribeToGameData = (
  gameId: string,
  onGameUpdate: (game: Game | null, animationHints: AnimationHint[]) => void,
  onError?: (error: Error) => void,
) => {
  const gameRef = ref(database, `games/${gameId}`);

  const unsubscribe = onValue(
    gameRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val() as RealtimeDbObject | null;
      if (!data) {
        onGameUpdate(null, []);
        return;
      }
      onGameUpdate(data.game, data.animationHints || []);
    },
    (error) => {
      console.error('Error subscribing to game:', error);
      onError?.(error);
    },
  );

  return unsubscribe;
};

export const subscribeToMessages = (
  gameId: string,
  onMessagesUpdate: (messages: Message[] | null) => void,
  onError?: (error: Error) => void,
) => {
  const gameRef = ref(database, `games/${gameId}`);

  const unsubscribe = onValue(
    gameRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val() as RealtimeDbObject | null;
      if (!data) {
        onMessagesUpdate(null);
        return;
      }
      onMessagesUpdate(data.messages);
    },
    (error) => {
      console.error('Error subscribing to messages:', error);
      onError?.(error);
    },
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
