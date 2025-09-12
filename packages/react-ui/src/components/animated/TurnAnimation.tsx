import type { Player, TurnRollAnimationHint, TurnStartAnimationHint } from '@repo/engine';
import { FC, useState } from 'react';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useAnimationHandler } from '../../hooks/useAnimationHandler';

interface Props {
  player: Player;
}

const ANIMATION_DURATION = 1250;

export const TurnAnimation: FC<Props> = ({ player }) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const [animationState, setAnimationState] = useState({
    isAnimating: false,
    type: '',
    displayText: '',
  });

  const clearAnimation = () => setAnimationState({ isAnimating: false, type: '', displayText: '' });

  // Register animation handler
  useAnimationHandler<TurnRollAnimationHint>(
    'turnRoll',
    async (hint) => {
      const { payload } = hint;
      if (payload.playerId !== player.id) return Promise.resolve();

      let displayText = String(payload.originalRoll);
      if (payload.adjustedRoll) displayText += ` → ${String(payload.adjustedRoll)}`;
      if (payload.mandatoryTileIdx) displayText += ` 🛑`;

      document
        .getElementById(`avatar-${hint.payload.playerId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      // Start animation
      setAnimationState({
        isAnimating: true,
        type: 'turnRoll',
        displayText,
      });

      // Return a promise that resolves after animation completes
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
          clearAnimation();
        }, ANIMATION_DURATION); // Match the duration in the useEffect
      });
    },
    [player.id],
  );

  useAnimationHandler<TurnStartAnimationHint>(
    'turnStart',
    async (hint) => {
      if (hint.payload.playerId !== player.id) return Promise.resolve();

      // Start animation
      setAnimationState({
        isAnimating: true,
        type: 'turnStart',
        displayText: getMessage('webapp_newTurn', { name: player.name }),
      });
      document
        .getElementById(`avatar-${hint.payload.playerId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      // End animation after 1.5s
      setTimeout(clearAnimation, ANIMATION_DURATION);

      // Resolve early to allow the game state to update before the animation runs
      return Promise.resolve();
    },
    [player.id],
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
        animation: `turnRollSweep ${ANIMATION_DURATION}ms ease-in-out forwards`,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background:
            animationState.type === 'turnRoll' ? 'rgba(50, 50, 50, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
          fontStyle: 'italic',
          fontWeight: 600,
        }}
      >
        <ui.Text fontSize={UISize.xl}>{animationState.displayText}</ui.Text>
      </div>

      {/* Add keyframe animation */}
      <style>
        {`
          @keyframes turnRollSweep {
            0% { left: -100%; }
            30% { left: 0; }
            70% { left: 0; }
            100% { left: 100%; }
          }
        `}
      </style>
    </div>
  );
};
