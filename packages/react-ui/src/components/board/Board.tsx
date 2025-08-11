import { useEffect, useRef, useState } from 'react';
import { useListGamesAction, useUpdateUIThemeAction } from '../../context/AppActionsContext';
import { useCurrentBoard, useCurrentGame, useCurrentPlayers } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { PlayerAvatar } from '../animated/PlayerAvatar';
import { CurrentZoneIndicator } from './CurrentZoneIndicator';
import { TileDescriptions } from './TileDescriptions';

export const Board = () => {
  const ui = useUI();
  const imgRef = useRef<HTMLImageElement>(null);
  const players = useCurrentPlayers();
  const board = useCurrentBoard();
  const boardId = useCurrentGame((g) => g.metadata.board);
  const [, setIsImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const listGames = useListGamesAction();
  const updateUITheme = useUpdateUIThemeAction();

  useEffect(() => {
    // Force a rerender once the image is loaded so that avatars don't try to load with a missing image
    if (imgRef.current) {
      const img = imgRef.current;
      img.onload = () => setIsImageLoaded(true);
    }

    // Update color theme based on board
    const updateTheme = async () => {
      const color = (await listGames()).find((bm) => bm.id === boardId)?.colorTheme;
      updateUITheme(color || 'cyan');
    };

    updateTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ui.Flex>
      <div style={{ position: 'relative' }}>
        <img
          aria-hidden
          src={board.imageUrl}
          ref={imgRef}
          // onClick={() => setIsZoomed((prev) => !prev)}
          style={{
            maxWidth: isZoomed ? '150%' : '100%',
            width: isZoomed ? '150%' : '100%',
            display: 'block',
          }}
        />
        {Object.values(players).map((p) => (
          <PlayerAvatar player={p} imageRef={imgRef} key={p.id} />
        ))}
        <TileDescriptions imageRef={imgRef} />
        <CurrentZoneIndicator />
      </div>
    </ui.Flex>
  );
};
