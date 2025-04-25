// In packages/react-ui/src/context/AnimationContext.tsx
import type { AnimationHint } from '@repo/engine';
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface AnimationContextValue {
  // Current animation state
  isAnimating: boolean;

  // For the game provider to trigger animations
  playAnimations: (hints: AnimationHint[]) => Promise<void>;

  // For components to register/unregister as animation handlers
  registerAnimationHandler: (
    hintType: string,
    handler: (hint: AnimationHint) => Promise<void>,
  ) => () => void;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationHandlers = useRef<Record<string, Array<(hint: AnimationHint) => Promise<void>>>>(
    {},
  );

  // Register a component as an animation handler
  const registerAnimationHandler = useCallback(
    (hintType: string, handler: (hint: AnimationHint) => Promise<void>) => {
      // Create the handler array if it doesn't exist
      if (!animationHandlers.current[hintType]) {
        animationHandlers.current[hintType] = [];
      }

      // Add the handler
      animationHandlers.current[hintType].push(handler);

      // Return a cleanup function
      return () => {
        if (animationHandlers.current[hintType]) {
          animationHandlers.current[hintType] = animationHandlers.current[hintType].filter(
            (h) => h !== handler,
          );
        }
      };
    },
    [],
  );

  // Play a set of animations
  const playAnimations = useCallback(async (hints: AnimationHint[]): Promise<void> => {
    if (!hints.length) return Promise.resolve();

    setIsAnimating(true);

    try {
      // Process each hint sequentially
      for (const hint of hints) {
        const hintType = hint.type;
        const handlers = animationHandlers.current[hintType] || [];

        if (handlers.length > 0) {
          // Run all handlers for this hint type in parallel
          await Promise.all(handlers.map((handler) => handler(hint)));
        } else {
          console.debug(`No animation handlers registered for hint type: ${hintType}`);
        }
      }
    } finally {
      setIsAnimating(false);
    }

    return Promise.resolve();
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        isAnimating,
        playAnimations,
        registerAnimationHandler,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
