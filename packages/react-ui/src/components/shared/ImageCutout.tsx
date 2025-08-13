import { useMemo } from 'react';

// clip-path is applied before scale on the image, so it doesn't need to take scale into account
const getClipPath = (position: Array<{ x: number; y: number }>) => {
  return `polygon(${position.map(({ x, y }) => `${x}px ${y}px`).join(', ')})`;
};

interface Props {
  imageUrl: string;
  position: Array<{ x: number; y: number }>;
  scale: number;
}

/**
 * Reusable component that uses CSS clip-path to cutout a section of an image 
 * based on the provided coordinates. The section is positioned properly and scaled.
 */
export const ImageCutout = ({ imageUrl, position, scale }: Props) => {
  // Find bounding box of the shape to position image
  const positioningInfo = useMemo(() => {
    if (!position?.length) return null;
    const minX = Math.min(...position.map((p) => p.x));
    const maxX = Math.max(...position.map((p) => p.x));
    const minY = Math.min(...position.map((p) => p.y));
    const maxY = Math.max(...position.map((p) => p.y));

    const width = (maxX - minX) * scale;
    const height = (maxY - minY) * scale;
    return { width, height, minX, minY };
  }, [position, scale]);

  if (!positioningInfo) return null;

  const { width, height, minX, minY } = positioningInfo;

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden',
        boxShadow: position.length === 4 ? '0 0 20px rgba(0, 0, 0, 0.5)' : '',
      }}
    >
      <img
        aria-hidden
        src={imageUrl}
        style={{
          position: 'absolute',
          left: `${-minX * scale}px`,
          top: `${-minY * scale}px`,
          height: 'auto',
          width: 'auto',
          maxWidth: 'none',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          clipPath: getClipPath(position),
        }}
      />
    </div>
  );
};