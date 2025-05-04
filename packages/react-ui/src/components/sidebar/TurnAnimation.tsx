import type { TurnRollAnimationHint } from '@repo/engine';
import { FC, useState } from 'react';
import { useAnimationHandler } from '../../hooks/useAnimationHandler';

interface Props {
  playerId: string;
}

export const TurnAnimation: FC<Props> = ({ playerId }) => {
  const [animationState, setAnimationState] = useState({ isAnimating: false, roll: -1 });

  // Register animation handler
  useAnimationHandler<TurnRollAnimationHint>(
    'turnRoll',
    async (hint) => {
      if (hint.payload.playerId !== playerId) return Promise.resolve();
      // Start animation
      setAnimationState({ isAnimating: true, roll: hint.payload.roll });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          setAnimationState({ isAnimating: false, roll: -1 });
        }, 500);
      });
    },
    [playerId],
  );

  if (!animationState.isAnimating) return null;
  return <div>{animationState.roll}</div>;
};
