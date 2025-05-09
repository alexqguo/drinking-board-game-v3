import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

// Placeholder type - This should be replaced with actual types from your domain
// For example, EngineGameRequest might come from your @repo/engine package
export type EngineGameRequest = {
  type: string; // Replace with actual EngineGameRequest type
  payload?: unknown; // Replace with actual EngineGameRequest type, using unknown instead of any
};

/**
 * Interface defining all possible actions that can be invoked from react-ui
 * and implemented by the host application (e.g., webapp).
 */
export interface AppActions {
  gameRequest: (request: EngineGameRequest) => Promise<void>;
  redirectToHomePage: () => void;
  updateUIThemeColor: (newColor: string) => void;
  createAndJoinGame: (gameId?: string, boardId?: string) => Promise<void>; // Replace with actual signature from HomePage.tsx
  // Add other actions here as needed
}

/**
 * Type for the context value, which includes the actions
 * and methods to register/unregister them.
 */
export interface AppActionsContextType {
  actions: AppActions;
  registerAction: <K extends keyof AppActions>(
    actionName: K,
    actionImplementation: AppActions[K],
  ) => void;
  unregisterAction: (actionName: keyof AppActions) => void;
}

const defaultGameRequest: (request: EngineGameRequest) => Promise<void> = async (request) => {
  console.error(`AppAction "gameRequest" called before being implemented. Request:`, request);
  return Promise.resolve();
};

const defaultRedirectToHomePage: () => void = () => {
  console.error('AppAction "redirectToHomePage" called before being implemented.');
};

const defaultUpdateUIThemeColor: AppActions['updateUIThemeColor'] = (...args) => {
  console.error('AppAction "updateUITheme" called before being implemented.', args);
};

const defaultCreateAndJoinGame: AppActions['createAndJoinGame'] = async (...args) => {
  console.error('AppAction "createAndJoinGame" called before being implemented.', args);
  return Promise.resolve();
};

// Default implementations that warn if called before being overridden.
const defaultActions: AppActions = {
  gameRequest: defaultGameRequest,
  redirectToHomePage: defaultRedirectToHomePage,
  updateUIThemeColor: defaultUpdateUIThemeColor,
  createAndJoinGame: defaultCreateAndJoinGame,
};

export const AppActionsContext = createContext<AppActionsContextType | undefined>(undefined);

interface AppActionsProviderProps {
  children: ReactNode;
}

export const AppActionsProvider: React.FC<AppActionsProviderProps> = ({ children }) => {
  const [actions, setActions] = useState<AppActions>(defaultActions);

  const registerAction = useCallback(
    <K extends keyof AppActions>(actionName: K, actionImplementation: AppActions[K]) => {
      setActions((prevActions) => ({
        ...prevActions,
        [actionName]: actionImplementation,
      }));
    },
    [],
  );

  const unregisterAction = useCallback((actionName: keyof AppActions) => {
    setActions((prevActions) => ({
      ...prevActions,
      [actionName]: defaultActions[actionName], // Revert to default
    }));
  }, []);

  const contextValue: AppActionsContextType = {
    actions,
    registerAction,
    unregisterAction,
  };

  return <AppActionsContext.Provider value={contextValue}>{children}</AppActionsContext.Provider>;
};

type AppActionSelector<T> = (appActions: AppActionsContextType) => T;
export function useAppActions(): AppActionsContextType;
export function useAppActions<T>(selector: AppActionSelector<T>): T;
export function useAppActions<T>(selector?: AppActionSelector<T>): AppActionsContextType | T {
  const context = useContext(AppActionsContext);
  if (context === undefined)
    throw new Error('useAppActions must be used within an AppActionsProvider');

  return useMemo(() => {
    if (!selector) return context;
    return selector(context);
  }, [context, selector]);
}
