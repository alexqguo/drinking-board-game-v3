import { useEffect, useRef, useState } from 'react';
import { useAppActions } from '../../context/AppActionsContext';
import { useCurrentBoard, useCurrentPlayers } from '../../context/GameContext';
import { PlayerAvatar } from '../animated/PlayerAvatar';

export const Board = () => {
  const updateTheme = useAppActions((ctx) => ctx.actions.updateUIThemeColor);
  const imgRef = useRef<HTMLImageElement>(null);
  const players = useCurrentPlayers();
  const board = useCurrentBoard();
  const [, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Force a rerender once the image is loaded so that avatars don't try to load with a missing image
    if (imgRef.current) {
      const img = imgRef.current;
      img.onload = () => setIsImageLoaded(true);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <img aria-hidden src={board.imageUrl} ref={imgRef} />
      {Object.values(players).map((p) => (
        <PlayerAvatar player={p} imageRef={imgRef} key={p.id} />
      ))}
    </div>
  );
};
