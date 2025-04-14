import { Board } from './board/Board';
import { Prompt } from './prompts/Prompt';

export const Game = () => {

  return (
    <>
      <Prompt />
      <Board />
    </>
  );
}