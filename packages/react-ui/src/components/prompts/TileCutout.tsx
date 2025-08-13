import { useCurrentBoard } from '../../context/GameContext';
import { ImageCutout } from '../shared/ImageCutout';

const SCALE = 1.3; // Change this value to adjust the scale of the cutout

interface Props {
  ruleId?: string;
}

/**
 * Uses ImageCutout to display a section of the board based on the coordinates of the tile.
 */
export const TileCutout = ({ ruleId }: Props) => {
  const imageUrl = useCurrentBoard((b) => b.imageUrl);
  const tile = useCurrentBoard((b) => b.tiles.find((t) => t.rule.id === ruleId));

  if (!tile || !ruleId) return null;

  return <ImageCutout imageUrl={imageUrl} position={tile.position} scale={SCALE} />;
};
