import type { TurnRollAnimationHint } from '@repo/engine';
import { FC, useState } from 'react';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useAnimationHandler } from '../../hooks/useAnimationHandler';

interface Props {
  playerId: string;
}

export const TurnAnimation: FC<Props> = ({ playerId }) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const [animationState, setAnimationState] = useState({
    isAnimating: false,
    roll: -1,
  });

  // Register animation handler
  useAnimationHandler<TurnRollAnimationHint>(
    'turnRoll',
    async (hint) => {
      if (hint.payload.playerId !== playerId) return Promise.resolve();

      // Start animation
      setAnimationState({ isAnimating: true, roll: hint.payload.roll });
      document
        .getElementById(`avatar-${hint.payload.playerId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      // Return a promise that resolves after animation completes
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
          setAnimationState({ isAnimating: false, roll: -1 });
        }, 1000); // Match the duration in the useEffect
      });
    },
    [playerId],
  );

  if (!animationState.isAnimating) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '-100%',
        transform: 'translateY(-50%)',
        width: '100%',
        zIndex: 1000,
        animation: 'turnRollSweep 1s ease-in-out forwards',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '1rem 0',
          textAlign: 'center',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <ui.Text fontSize={UISize.xl}>
          {getMessage('webapp_rollBanner', { num: animationState.roll })}
        </ui.Text>
      </div>

      {/* Add keyframe animation */}
      <style>
        {`
          @keyframes turnRollSweep {
            0% { left: -100%; }
            40% { left: 0; }
            60% { left: 0; }
            100% { left: 100%; }
          }
        `}
      </style>
    </div>
  );
};
