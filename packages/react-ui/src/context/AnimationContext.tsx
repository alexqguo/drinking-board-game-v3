import type { AnimationHint } from '@repo/engine';
import React, { useCallback, useState } from 'react';
import { createGenericRegistryContext } from '../registry/createGenericRegistryContext';

// Define animation handler type for a single hint type
type AnimationHandler = (hint: AnimationHint) => Promise<void>;

// Composite handler manages multiple handlers for the same hint type
class CompositeAnimationHandler {
  private handlers: AnimationHandler[] = [];

  add(handler: AnimationHandler): () => void {
    this.handlers.push(handler);
    return () => {
      const index = this.handlers.indexOf(handler);
      if (index > -1) {
        this.handlers.splice(index, 1);
      }
    };
  }

  async execute(hint: AnimationHint): Promise<void> {
    if (this.handlers.length === 0) {
      console.debug(`No animation handlers registered for hint type: ${hint.type}`);
      return;
    }
    // Run all handlers for this hint type in parallel
    await Promise.all(this.handlers.map((handler) => handler(hint)));
  }

  isEmpty(): boolean {
    return this.handlers.length === 0;
  }
}

// Define the animation handlers interface
export interface AnimationHandlers {
  playerMove: CompositeAnimationHandler;
  turnRoll: CompositeAnimationHandler;
  turnStart: CompositeAnimationHandler;
  unsupported: CompositeAnimationHandler;
}

// Default handlers that log when no implementation is provided
const createDefaultHandler = (hintType: string): CompositeAnimationHandler => {
  const handler = new CompositeAnimationHandler();
  return handler;
};

export const defaultAnimationHandlers: AnimationHandlers = {
  playerMove: createDefaultHandler('playerMove'),
  turnRoll: createDefaultHandler('turnRoll'),
  turnStart: createDefaultHandler('turnStart'),
  unsupported: createDefaultHandler('unsupported'),
};

// Create the AnimationContext using the generic registry system
const {
  registryInstance: animationHandlersRegistry,
  Provider: AnimationHandlersProvider,
  useRegistryInstance: useAnimationHandlersRegistryInstance,
  useRegistryItems: useAllAnimationHandlers,
  useRegistryItem: useAnimationHandler,
} = createGenericRegistryContext<AnimationHandlers>('AnimationHandlers', defaultAnimationHandlers);

// Custom provider that includes animation state management
export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <AnimationHandlersProvider>
      <AnimationStateProvider isAnimating={isAnimating} setIsAnimating={setIsAnimating}>
        {children}
      </AnimationStateProvider>
    </AnimationHandlersProvider>
  );
};

// Internal context for animation state
const AnimationStateContext = React.createContext<{
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
} | null>(null);

const AnimationStateProvider: React.FC<{
  children: React.ReactNode;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}> = ({ children, isAnimating, setIsAnimating }) => {
  return (
    <AnimationStateContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </AnimationStateContext.Provider>
  );
};

const useAnimationState = () => {
  const context = React.useContext(AnimationStateContext);
  if (!context) {
    throw new Error('useAnimationState must be used within an AnimationProvider');
  }
  return context;
};

// Backward-compatible interface for existing components
interface AnimationContextValue {
  isAnimating: boolean;
  playAnimations: (hints: AnimationHint[]) => Promise<void>;
  registerAnimationHandler: (
    hintType: string,
    handler: (hint: AnimationHint) => Promise<void>,
  ) => () => void;
}

// Main hook that provides the backward-compatible interface
export const useAnimation = (): AnimationContextValue => {
  const { isAnimating, setIsAnimating } = useAnimationState();
  const registry = useAnimationHandlersRegistryInstance();
  const allHandlers = useAllAnimationHandlers();

  const registerAnimationHandler = useCallback(
    (hintType: string, handler: (hint: AnimationHint) => Promise<void>) => {
      const compositeHandler = allHandlers[hintType as keyof AnimationHandlers];
      if (compositeHandler) {
        return compositeHandler.add(handler);
      }
      console.warn(`Unknown animation hint type: ${hintType}`);
      return () => {}; // no-op cleanup
    },
    [allHandlers],
  );

  const playAnimations = useCallback(
    async (hints: AnimationHint[]): Promise<void> => {
      if (!hints.length) return Promise.resolve();

      setIsAnimating(true);

      try {
        // Process each hint sequentially
        for (const hint of hints) {
          const hintType = hint.type as keyof AnimationHandlers;
          const compositeHandler = allHandlers[hintType];
          if (compositeHandler) {
            await compositeHandler.execute(hint);
          } else {
            console.debug(`No animation handlers registered for hint type: ${hintType}`);
          }
        }
      } finally {
        setIsAnimating(false);
      }

      return Promise.resolve();
    },
    [allHandlers, setIsAnimating],
  );

  return {
    isAnimating,
    playAnimations,
    registerAnimationHandler,
  };
};

// Export registry-specific exports for advanced usage
export {
  animationHandlersRegistry,
  useAnimationHandlersRegistryInstance,
  useAllAnimationHandlers,
  useAnimationHandler,
};
