import { useRef } from 'react';
import { useCurrentBoard, useCurrentPlayers } from '../../context/GameContext';
import { PlayerAvatar } from '../PlayerAvatar';

export const Board = () => {
  const imgRef = useRef(null);
  const players = useCurrentPlayers();
  const boardImageUrl = useCurrentBoard(b => b.imageUrl);

  return (
    <div style={{ position: 'relative' }}>
      <img aria-hidden src={boardImageUrl} ref={imgRef} />
      {Object.values(players).map(p => (
        <PlayerAvatar player={p} imageRef={imgRef} key={p.id} />
      ))}
    </div>
  );
}