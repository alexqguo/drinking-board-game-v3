import type { AnimationHint } from '@repo/engine';
import { useEffect } from 'react';
import { useAnimation } from '../context/AnimationContext';

export function useAnimationHandler<T extends AnimationHint>(
  hintType: string,
  handler: (hint: T) => Promise<void>,
  deps: React.DependencyList = [],
) {
  const { registerAnimationHandler } = useAnimation();

  useEffect(() => {
    // Type assertion needed here because we know the handler
    // will only be called with the right hint type
    const cleanup = registerAnimationHandler(
      hintType,
      async (hint: AnimationHint) => await handler(hint as T),
    );

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
