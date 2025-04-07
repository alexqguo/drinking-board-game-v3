import { useCurrentGame } from '../context/GameContext';

export const Game = () => {
  const game = useCurrentGame();

  return (
    <div>
      {JSON.stringify(game)}
    </div>
  )
}