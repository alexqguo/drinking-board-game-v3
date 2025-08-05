# Generic Registry Context Pattern

The Generic Registry Context pattern provides a consistent, reactive way to manage dynamic implementations across the React UI package. It combines a generic registry system with React Context to enable components to register and swap implementations at runtime.

## Overview

The pattern consists of two main parts:

1. **GenericRegistry**: A generic, observable key-value store that manages implementations
2. **createGenericRegistryContext**: A factory function that creates React Context, Provider, and hooks for a GenericRegistry instance

## Key Features

- **Reactive Updates**: Uses `useSyncExternalStore` for automatic re-renders when implementations change
- **Type Safety**: Full TypeScript support with generic constraints and inference
- **Default Implementations**: Supports fallback implementations when no custom implementation is registered
- **Consistent API**: Standardized pattern for all dynamic implementation contexts

## Usage Examples

### Creating a Registry Context

```typescript
import { createGenericRegistryContext } from '../registry/createGenericRegistryContext';

// 1. Define the interface for your implementations
export interface MyActions {
  doSomething: (arg: string) => void;
  doSomethingElse: (arg: number) => Promise<string>;
}

// 2. Define default implementations
export const defaultMyActions: MyActions = {
  doSomething: (arg) => console.warn('doSomething not implemented', arg),
  doSomethingElse: async (arg) => {
    console.warn('doSomethingElse not implemented', arg);
    return 'default';
  },
};

// 3. Create the context using the factory
const {
  registryInstance,
  Provider,
  useRegistryInstance,
  useRegistryItems,
  useRegistryItem,
} = createGenericRegistryContext<MyActions>('MyActions', defaultMyActions);

// 4. Export what you need
export {
  Provider as MyActionsProvider,
  registryInstance as myActionsRegistry,
  useRegistryInstance as useMyActionsRegistryInstance,
  useRegistryItems as useAllMyActions,
  useRegistryItem as useMyAction,
};
```

### Registering Implementations

```typescript
// From a component or elsewhere
const Component = () => {
  const registry = useMyActionsRegistryInstance();

  useEffect(() => {
    // Register a custom implementation
    registry.register('doSomething', (arg) => {
      console.log('Custom implementation:', arg);
    });

    // Cleanup function
    return () => registry.unregister('doSomething');
  }, [registry]);

  return <div>Component content</div>;
};
```

### Using Implementations

```typescript
// Get all implementations reactively
const allActions = useAllMyActions();

// Get a specific implementation reactively  
const doSomething = useMyAction('doSomething');

// Use the implementation
doSomething('hello world');
```

## Current Usage in Codebase

The generic registry pattern is currently used in two contexts:

### 1. App Actions Context (`AppActionsContext.tsx`)

Manages application-level actions like game requests, UI theme updates, and media path retrieval. Uses single handler per action type with the ability to override implementations.

```typescript
export interface AppActions {
  executeGameRequestAction: <T extends keyof Payloads>(
    action: T,
    actionArgs: Payloads[T],
  ) => Promise<void>;
  updateUITheme: (colorPalette: string) => void;
  // ... other actions
}
```

### 2. Animation Context (`AnimationContext.tsx`)

Manages animation handlers for different hint types. Uses a composite handler system to support multiple handlers per hint type, maintaining backward compatibility with the original array-based system.

```typescript
export interface AnimationHandlers {
  playerMove: CompositeAnimationHandler;
  turnRoll: CompositeAnimationHandler;
  turnStart: CompositeAnimationHandler;
  unsupported: CompositeAnimationHandler;
}
```

## Benefits

1. **Consistency**: All dynamic implementation contexts follow the same pattern
2. **Reactivity**: Components automatically re-render when implementations change
3. **Type Safety**: Full TypeScript support prevents runtime errors
4. **Flexibility**: Easy to extend with new implementation types
5. **Testability**: Easy to mock implementations for testing
6. **Performance**: Optimized with `useSyncExternalStore` for minimal re-renders

## Registry API

### GenericRegistry Methods

- `register(key, implementation)`: Register or update an implementation
- `unregister(key)`: Remove implementation, reverting to default
- `getItem(key)`: Get a specific implementation
- `getAllItems()`: Get all implementations as an object
- `subscribe(listener)`: Subscribe to changes, returns unsubscribe function

### Context Hooks

- `useRegistryInstance()`: Get the registry instance for registration/unregistration
- `useRegistryItems()`: Get all implementations reactively
- `useRegistryItem(key)`: Get a specific implementation reactively

## Migration Notes

When migrating from manual context implementations to the registry pattern:

1. Define your implementations interface
2. Create default implementations 
3. Use the factory to create context components and hooks
4. Update components to use the new hooks
5. Maintain backward compatibility where needed
6. Test thoroughly to ensure no breaking changes