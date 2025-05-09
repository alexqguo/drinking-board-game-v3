import { useMemo } from 'react';
import { useCurrentBoard } from '../../context/GameContext';

const SCALE = 1.5; // Change this value to adjust the scale of the cutout

// clip-path is applied before scale on the image, so it doesn't need to take scale into account
const getClipPath = (position: Array<{ x: number; y: number }>) => {
  return `polygon(${position.map(({ x, y }) => `${x}px ${y}px`).join(', ')})`;
};

interface Props {
  ruleId?: string;
}

/**
 * Uses CSS clip-path to cutout a section of the board based on the coordinates of the tile.
 * However this section still needs to be positioned properly into the <div> container, hence
 * the absolute positioning.
 */
export const TileCutout = ({ ruleId }: Props) => {
  const url = useCurrentBoard((b) => b.imageUrl);
  const tile = useCurrentBoard((b) => b.tiles.find((t) => t.rule.id === ruleId));

  // Find bounding box of the shape to position image
  const positioningInfo = useMemo(() => {
    if (!tile?.position) return null;
    const minX = Math.min(...tile.position.map((p) => p.x));
    const maxX = Math.max(...tile.position.map((p) => p.x));
    const minY = Math.min(...tile.position.map((p) => p.y));
    const maxY = Math.max(...tile.position.map((p) => p.y));

    const width = (maxX - minX) * SCALE;
    const height = (maxY - minY) * SCALE;
    return { width, height, minX, minY };
  }, [tile?.position]);

  if (!tile || !ruleId || !positioningInfo) return null;

  const { width, height, minX, minY } = positioningInfo;

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden',
        boxShadow: tile.position.length === 4 ? '0 0 20px rgba(0, 0, 0, 0.5)' : '',
      }}
    >
      <img
        aria-hidden
        src={url}
        style={{
          position: 'absolute',
          left: `${-minX * SCALE}px`,
          top: `${-minY * SCALE}px`,
          height: 'auto',
          width: 'auto',
          maxWidth: 'none',
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
          clipPath: getClipPath(tile.position),
        }}
      />
    </div>
  );
};
