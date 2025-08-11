import { FC, RefObject, useState } from 'react';
import { useCurrentBoard } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { TileCutout } from '../prompts/TileCutout';

interface TileTooltipData {
  ruleId: string;
  x: number;
  y: number;
}

interface Props {
  imageRef: RefObject<HTMLImageElement>;
}

export const TileDescriptions: FC<Props> = ({ imageRef }) => {
  const ui = useUI();
  const board = useCurrentBoard();
  const [hoveredTile, setHoveredTile] = useState<TileTooltipData | null>(null);
  // eslint-disable-next-line
  const _ = useScreenSize(); // Just to trigger recalculation when screen size changes

  // Create overlay elements for each tile that respond to hover
  const renderTileOverlays = () => {
    if (!board || !board.tiles || !imageRef.current) return null;

    // Get image scaling factors
    const naturalWidth = imageRef.current.naturalWidth || 0;
    const naturalHeight = imageRef.current.naturalHeight || 0;
    const actualWidth = imageRef.current.width || 0;
    const actualHeight = imageRef.current.height || 0;

    // Calculate scale factors
    const scaleX = actualWidth / naturalWidth;
    const scaleY = actualHeight / naturalHeight;

    return board.tiles.map((tile, index) => {
      const { position, rule } = tile;

      // Calculate scaled position points for the polygon
      const scaledPoints = position.map((point) => ({
        x: point.x * scaleX,
        y: point.y * scaleY,
      }));

      // Create a polygon clip path string from the scaled points
      const clipPathPoints = scaledPoints.map((point) => `${point.x}px ${point.y}px`).join(', ');

      // Calculate the max X and min Y for tooltip positioning
      const maxX = Math.max(...scaledPoints.map((point) => point.x));
      const minY = Math.min(...scaledPoints.map((point) => point.y));

      // Sadly this is not compatible with the normal HoverTooltip
      return (
        <div
          key={`tile-${index}-${rule.id}`}
          className="__tile"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            clipPath: `polygon(${clipPathPoints})`,
          }}
          onMouseEnter={() => {
            setHoveredTile({
              ruleId: rule.id,
              // Position tooltip to the right of the tile with some offset
              x: maxX + 10,
              y: minY - 10,
            });
          }}
          onMouseLeave={() => setHoveredTile(null)}
        />
      );
    });
  };

  return (
    <>
      {renderTileOverlays()}
      <style>
        {`
          .__tile {
            position: absolute;
            cursor: pointer;
            transition: background-color 0.2s ease-in;
          }

          .__tile:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      {/* Tooltip that follows the hovered tile */}
      {hoveredTile && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(hoveredTile.x, window.innerWidth - 400), // Prevent overflow, assume max tooltip width of 300px
            top: hoveredTile.y,
            zIndex: 20,
            pointerEvents: 'none', // Prevents the tooltip from interfering with hover
            maxWidth: '400px',
          }}
        >
          <ui.Card>
            <TileCutout ruleId={hoveredTile.ruleId} />
          </ui.Card>
        </div>
      )}
    </>
  );
};
