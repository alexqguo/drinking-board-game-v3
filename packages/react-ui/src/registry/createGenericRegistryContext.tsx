import React, { createContext, useContext } from 'react';
// useSyncExternalStore is available in React 18+.
import { useSyncExternalStore } from 'react';
import { GenericRegistry } from './GenericRegistry';

/**
 * Creates a React Context, Provider, and hooks for a GenericRegistry instance.
 * @param displayName A name for the context, used for debugging (e.g., "AppActions").
 * @param defaultItems The default set of items for the registry.
 */
export function createGenericRegistryContext<T extends Record<string, any>>(
  displayName: string,
  defaultItems: T,
) {
  // 1. Create the single, potentially shared, instance of the registry.
  // This instance can be exported and used directly by non-React code.
  const registryInstance = new GenericRegistry<T>(defaultItems);

  // 2. Create the React Context. It will hold the registry instance.
  const Context = createContext<GenericRegistry<T> | null>(null);
  Context.displayName = `${displayName}RegistryContext`;

  // 3. Create the Provider component.
  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // The value provided by the context is the stable registryInstance.
    return <Context.Provider value={registryInstance}>{children}</Context.Provider>;
  };

  // 4. Create a hook to access the raw registry instance (for registering, etc., from components).
  const useRegistryInstance = (): GenericRegistry<T> => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`use${displayName}Instance must be used within a ${displayName}Provider`);
    }
    return context;
  };

  // 5. Create a hook to get all items reactively.
  // Components using this hook will re-render when the registry changes.
  const useRegistryItems = (): T => {
    const registry = useRegistryInstance();
    const items = useSyncExternalStore(
      registry.subscribe.bind(registry), // memoized subscribe function
      () => registry.getAllItems(), // get snapshot
      () => registry.getAllItems(), // get server snapshot (can be same for client-only)
    );
    return items;
  };

  // 6. Create a hook to get a specific item reactively.
  // Components using this hook will re-render if this specific item changes.
  const useRegistryItem = <K extends keyof T>(itemName: K): T[K] => {
    const registry = useRegistryInstance();
    const item = useSyncExternalStore(
      registry.subscribe.bind(registry),
      () => registry.getItem(itemName),
      () => registry.getItem(itemName),
    );
    return item;
  };

  return {
    registryInstance, // Export for non-React usage
    Provider,
    useRegistryInstance, // Hook to get the registry instance (for calling .register etc.)
    useRegistryItems, // Hook to get all items (reactive)
    useRegistryItem, // Hook to get a specific item (reactive)
  };
}
