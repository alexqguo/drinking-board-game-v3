import { useEffect, useRef, useState } from 'react';
import { useListGamesAction, useUpdateUIThemeAction } from '../../context/AppActionsContext';
import { useCurrentBoard, useCurrentGame, useCurrentPlayers } from '../../context/GameContext';
import { PlayerAvatar } from '../animated/PlayerAvatar';
import { CurrentZoneIndicator } from './CurrentZoneIndicator';

export const Board = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const players = useCurrentPlayers();
  const board = useCurrentBoard();
  const boardId = useCurrentGame((g) => g.metadata.board);
  const [, setIsImageLoaded] = useState(false);
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
    <div style={{ position: 'relative' }}>
      <img aria-hidden src={board.imageUrl} ref={imgRef} />
      {Object.values(players).map((p) => (
        <PlayerAvatar player={p} imageRef={imgRef} key={p.id} />
      ))}
      <CurrentZoneIndicator />
    </div>
  );
};
