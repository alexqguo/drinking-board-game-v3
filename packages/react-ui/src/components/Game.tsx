import { useCurrentGame } from '../context/GameContext';
import { Board } from './board/Board';
import { Prompt } from './prompts/Prompt';

export const Game = () => {
  const g = useCurrentGame();

  return (
    <>
      {JSON.stringify(g)}
      <Prompt />
      <Board />
    </>
  );
};
