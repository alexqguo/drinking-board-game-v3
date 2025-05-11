import { BoardMetadata } from '@repo/schemas';
import { createGenericRegistryContext } from '../registry/createGenericRegistryContext';

// 1. Define Core Types and Defaults
export type EngineGameRequest = {
  type: string;
  payload?: unknown; // Using unknown for better type safety than any
};

export interface AppActions {
  gameRequest: (request: EngineGameRequest) => Promise<void>;
  updateUITheme: (colorPalette: string) => void;
  createAndJoinGame: (board: string, playerNames: string[]) => Promise<void>;
  listGames: () => Promise<BoardMetadata[]>;
}

export const defaultAppActions: AppActions = {
  gameRequest: async (request) => {
    console.error(`AppAction "gameRequest" called before being implemented. Request:`, request);
    return Promise.resolve();
  },
  updateUITheme: (...args) => {
    console.error('AppAction "updateUITheme" called before being implemented.', args);
  },
  createAndJoinGame: async (...args) => {
    console.error('AppAction "createAndJoinGame" called before being implemented.', args);
    return Promise.resolve();
  },
  listGames: async () => {
    console.error('AppAction "listGames" called before being implemented.');
    return Promise.resolve([]);
  },
};

// 2. Create the New AppActions Context using the Factory
const {
  registryInstance: appActionsRegistry, // For non-React usage
  Provider: AppActionsProvider, // The React Provider component
  useRegistryInstance: useAppActionsRegistryInstance, // Hook to get the registry instance
  useRegistryItems: useAllAppActions, // Hook to get all actions reactively
  useRegistryItem: useAppAction, // Hook to get a specific action reactively
} = createGenericRegistryContext<AppActions>('AppActions', defaultAppActions);

// 3. Export the New Context Components and Hooks
export {
  AppActionsProvider,
  appActionsRegistry,
  useAllAppActions,
  useAppAction,
  useAppActionsRegistryInstance,
};

// 4. Create and export specific convenience hooks for each action
export const useGameRequestAction = () => useAppAction('gameRequest');
export const useUpdateUIThemeAction = () => useAppAction('updateUITheme');
export const useCreateAndJoinGameAction = () => useAppAction('createAndJoinGame');
export const useListGamesAction = () => useAppAction('listGames');

// Note: The old useAppActions hook that returned { actions, registerAction, unregisterAction }
// is effectively replaced. Consumers will now use:
// - Specific action hooks (e.g., useGameRequestAction())
// - useAppActionsRegistryInstance() to get the registry for .register() or .unregister() calls.
