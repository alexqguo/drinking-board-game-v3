import { useCurrentGame } from '../context/GameContext';
import { Prompt } from './prompts/Prompt';

export const Game = () => {
  const game = useCurrentGame();

  return (
    <div>
      <Prompt />
      {JSON.stringify(game)}
    </div>
  )
}