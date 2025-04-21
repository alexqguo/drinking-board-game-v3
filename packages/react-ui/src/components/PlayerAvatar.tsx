import type { Player, Point } from '@repo/engine';
import { useCurrentBoard } from '../context/GameContext';
import { useUI } from '../context/UIEnvironmentContext';

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
  const playerTile = useCurrentBoard(b => b.tiles[player.tileIndex]);

  if (!playerTile || !imageRef.current) return null;
  const { position } = playerTile;

  return (
    <div style={{ position: 'absolute', ...calculatePos(position, imageRef) }}>
      <ui.Avatar
        name={player.name}
        width={`${AVATAR_SIZE}px`}
        height={`${AVATAR_SIZE}px`}
      />
    </div>
  );
}