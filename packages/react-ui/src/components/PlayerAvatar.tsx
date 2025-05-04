import type { Player, PlayerMoveAnimationHint } from '@repo/engine';
import { Point } from '@repo/schemas';
import { useRef, useState } from 'react';
import { useCurrentBoard } from '../context/GameContext';
import { useUI } from '../context/UIEnvironmentContext';
import { useAnimationHandler } from '../hooks/useAnimationHandler';
import { useScreenSize } from '../hooks/useScreenSize';

interface Props {
  player: Player;
  imageRef: React.MutableRefObject<null | HTMLImageElement>;
}

const AVATAR_SIZE = 40;

const calculatePos = (position: Point[], ref: Props['imageRef']) => {
  // 1. Calculate center point based on the tile's position
  const top = position.reduce((acc, point) => acc + point.y, 0) / position.length;
  const left = position.reduce((acc, point) => acc + point.x, 0) / position.length;

  // 2. Adjust based on image's actual rendered size vs natural size
  const naturalWidth = ref.current?.naturalWidth || 0;
  const naturalHeight = ref.current?.naturalHeight || 0;
  const actualWidth = ref.current?.width || 0;
  const actualHeight = ref.current?.height || 0;

  // 3. Calculate scale factors
  const scaleX = actualWidth / naturalWidth;
  const scaleY = actualHeight / naturalHeight;

  // 4. Apply scale to coordinates
  const scaledTop = top * scaleY;
  const scaledLeft = left * scaleX;

  // 5. Adjust for actual width of Avatar component
  const adjustedTop = scaledTop - AVATAR_SIZE / 2;
  const adjustedLeft = scaledLeft - AVATAR_SIZE / 2;

  return { top: adjustedTop, left: adjustedLeft };
};

export const PlayerAvatar = ({ player, imageRef }: Props) => {
  const ui = useUI();
  const avatarRef = useRef<HTMLDivElement>(null);
  const board = useCurrentBoard();
  // eslint-disable-next-line
  const _ = useScreenSize(); // Just to trigger recalculation when screen size changes

  // Local animation state
  const [animationState, setAnimationState] = useState<{
    isAnimating: boolean;
    targetTileIndex: number | null;
  }>({
    isAnimating: false,
    targetTileIndex: null,
  });

  // Register animation handler
  useAnimationHandler<PlayerMoveAnimationHint>(
    'playerMove',
    async (hint) => {
      // Only animate if this hint is for this player
      if (hint.payload.playerId !== player.id) {
        return Promise.resolve();
      }

      // Start animation
      setAnimationState({
        isAnimating: true,
        targetTileIndex: hint.payload.toTileIndex,
      });

      avatarRef.current?.scrollIntoView();

      // Return a promise that resolves when animation completes
      return new Promise<void>((resolve) => {
        // Animation duration matches CSS transition time
        const animationDuration = 500;

        setTimeout(() => {
          setAnimationState({
            isAnimating: false,
            targetTileIndex: null,
          });
          resolve();
        }, animationDuration);
      });
    },
    [player.id], // Only re-register if player ID changes
  );

  // Use either the animation target tile or the player's actual tile
  const tileIndex =
    animationState.isAnimating && animationState.targetTileIndex !== null
      ? animationState.targetTileIndex
      : player.tileIndex;

  const playerTile = board.tiles[tileIndex];

  if (!playerTile || !imageRef.current) return null;
  const { position } = playerTile;

  return (
    <div
      ref={avatarRef}
      style={{
        position: 'absolute',
        ...calculatePos(position, imageRef),
        transition: animationState.isAnimating ? 'top 0.5s, left 0.5s' : 'none',
      }}
    >
      <ui.Avatar name={player.name} width={`${AVATAR_SIZE}px`} height={`${AVATAR_SIZE}px`} />
    </div>
  );
};
