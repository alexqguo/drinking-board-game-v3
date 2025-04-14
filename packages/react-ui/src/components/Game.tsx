import { useCurrentBoard, useCurrentGame } from '../context/GameContext';
import { Prompt } from './prompts/Prompt';

export const Game = () => {
  const game = useCurrentGame();
  const boardImageUrl = useCurrentBoard(b => b.imageUrl);

  return (
    <div>
      <Prompt />
      <img aria-hidden src={boardImageUrl} />
    </div>
  );
}