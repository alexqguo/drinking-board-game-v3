import { useEffect, useRef, useState } from 'react';
import { useCurrentBoard, useCurrentPlayers } from '../../context/GameContext';
import { PlayerAvatar } from '../animations/PlayerAvatar';

export const Board = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const players = useCurrentPlayers();
  const boardImageUrl = useCurrentBoard((b) => b.imageUrl);
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
      <img aria-hidden src={boardImageUrl} ref={imgRef} />
      {Object.values(players).map((p) => (
        <PlayerAvatar player={p} imageRef={imgRef} key={p.id} />
      ))}
    </div>
  );
};
