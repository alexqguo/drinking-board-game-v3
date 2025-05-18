import { FC, RefObject, useState } from 'react';
import { useBoardI18n, useCurrentBoard } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';

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
  const { getMessage } = useBoardI18n();
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

    return Object.entries(board.tiles).map(([tileId, tile]) => {
      const { position, rule } = tile;

      // The board position is an array of points that define the corners of the tile
      // Calculate the bounding box (min/max coordinates) for the tile
      const minX = Math.min(...position.map((point) => point.x));
      const minY = Math.min(...position.map((point) => point.y));
      const maxX = Math.max(...position.map((point) => point.x));
      const maxY = Math.max(...position.map((point) => point.y));

      // Calculate width and height and apply scaling
      const width = (maxX - minX) * scaleX;
      const height = (maxY - minY) * scaleY;

      // Apply scaling to positions
      const scaledMinX = minX * scaleX;
      const scaledMinY = minY * scaleY;
      const scaledMaxX = maxX * scaleX;

      // // Calculate center point for tooltip positioning
      // const centerX = scaledMinX + width / 2;
      // const centerY = scaledMinY + height / 2;

      return (
        <div
          key={tileId}
          className="__tile"
          style={{
            left: scaledMinX,
            top: scaledMinY,
            width,
            height,
          }}
          onMouseEnter={() => {
            setHoveredTile({
              ruleId: tile.rule.id,
              x: scaledMaxX + 10, // 10px offset
              y: scaledMinY - 10,
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
            transition: 0.2s ease-in;
          }
          .__tile:hover {
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>

      {/* Tooltip that follows the hovered tile */}
      {hoveredTile && (
        <div
          style={{
            position: 'absolute',
            left: hoveredTile.x,
            top: hoveredTile.y,
            maxWidth: '200px',
            zIndex: 20,
            pointerEvents: 'none', // Prevents the tooltip from interfering with hover
          }}
        >
          <ui.Card>
            <ui.Text fontSize={UISize.s}>{getMessage(hoveredTile.ruleId)}</ui.Text>
          </ui.Card>
        </div>
      )}
    </>
  );
};
