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
  update,
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
  onMessagesUpdate: (messages: Message[]) => void,
  onError?: (error: Error) => void,
) => {
  const messagesRef = ref(database, `games/${gameId}/messages`);

  // Listen for all messages changes
  const unsubscribe = onValue(
    messagesRef,
    (snapshot: DataSnapshot) => {
      const data = snapshot.val() as Message[] | null;
      onMessagesUpdate(data ?? []);
    },
    (error) => {
      console.error('Error subscribing to messages:', error);
      onError?.(error);
    },
  );

  return unsubscribe;
};

/**
 * Monitors Firebase's connection state using the .info/connected reference
 * @param onConnectionChange Callback that receives the current connection state
 * @returns A function to unsubscribe from the connection listener
 */
export const monitorFirebaseConnection = (onConnectionChange: (isConnected: boolean) => void) => {
  const connectedRef = ref(database, '.info/connected');

  const unsubscribe = onValue(connectedRef, (snap) => {
    const connected = snap.val() === true;
    console.log('Firebase connection state:', connected ? 'connected' : 'disconnected');
    onConnectionChange(connected);
  });

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

/**
 * Debug function to directly move a player to a specific tile index
 * Bypasses all game logic and directly updates Firebase
 */
export const debugMovePlayer = async (
  gameId: string,
  playerIdOrName: string,
  tileIndex: number,
): Promise<void> => {
  try {
    // Validate that the game exists
    const game = await getGame(gameId);
    if (!game) {
      console.error(`[DEBUG] Game ${gameId} not found`);
      return;
    }

    // Find player by ID first, then by name
    let playerId = playerIdOrName;
    let player = game.players[playerIdOrName];

    if (!player) {
      // Try to find by name
      const playerEntry = Object.entries(game.players).find(([, p]) => p.name === playerIdOrName);
      if (playerEntry) {
        playerId = playerEntry[0];
        player = playerEntry[1];
      }
    }

    if (!player) {
      console.error(
        `[DEBUG] Player "${playerIdOrName}" not found in game (tried both ID and name)`,
      );
      return;
    }

    const playerRef = ref(database, `games/${gameId}/game/players/${playerId}`);
    await update(playerRef, {
      tileIndex: tileIndex,
    });
    console.log(`[DEBUG] Moved player ${player.name} (${playerId}) to tile ${tileIndex}`);
  } catch (error) {
    console.error(`[DEBUG] Failed to move player ${playerIdOrName}:`, error);
    throw error;
  }
};
