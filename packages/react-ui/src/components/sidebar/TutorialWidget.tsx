import { useMemo, useState } from 'react';
import { testIds } from '../../constants/testIds';
import { useCurrentBoard } from '../../context/GameContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { ImageCutout } from '../shared/ImageCutout';

/**
 * Consolidated tutorial widget that handles button display, modal state, and tutorial image cutout.
 * Only renders when the current board has tutorial data defined.
 */
export const TutorialWidget = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const ui = useUI();
  const { getMessage } = useI18n();
  const board = useCurrentBoard();

  // Don't render anything if the board doesn't have tutorial data
  if (!board?.tutorial?.position?.length) {
    return null;
  }

  const handleOpenTutorial = () => setIsTutorialOpen(true);
  const handleCloseTutorial = () => setIsTutorialOpen(false);

  // Calculate scale based on tutorial area size - smaller scale for larger areas
  const scale = useMemo(() => {
    if (!board.tutorial?.position?.length) return 1;

    const minX = Math.min(...board.tutorial.position.map((p) => p.x));
    const maxX = Math.max(...board.tutorial.position.map((p) => p.x));
    const minY = Math.min(...board.tutorial.position.map((p) => p.y));
    const maxY = Math.max(...board.tutorial.position.map((p) => p.y));

    const width = maxX - minX;
    const height = maxY - minY;
    const area = width * height;

    // Use smaller scale for larger tutorial areas (like Zelda's triangular area)
    if (area > 1000000) return 0.5; // Large areas (Zelda)
    return 1; // Small areas (gen1/gen2 rectangles)
  }, [board.tutorial?.position]);

  return (
    <>
      <ui.Button
        size={UISize.xs}
        variant="secondary"
        onClick={handleOpenTutorial}
        data-testid={testIds.tutorialBtn}
      >
        📚
      </ui.Button>

      <ui.Modal
        isOpen={isTutorialOpen}
        headerText={getMessage('webapp_tutorial_title')}
        data-testid={testIds.tutorialModal}
        footerContent={
          <ui.Button
            onClick={handleCloseTutorial}
            variant="primary"
            data-testid={testIds.tutorialCloseBtn}
          >
            {getMessage('webapp_tutorial_close')}
          </ui.Button>
        }
      >
        <ImageCutout imageUrl={board.imageUrl} position={board.tutorial.position} scale={scale} />
      </ui.Modal>
    </>
  );
};
