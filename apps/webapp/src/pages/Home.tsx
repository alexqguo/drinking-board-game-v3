import { UIEnvironmentContext } from '@repo/ui/context/UIEnvironmentContext';
import { useContext } from 'react';
import { gameRequest } from '../firebase/functions';

export const HomePage = () => {
  const { Button } = useContext(UIEnvironmentContext);
  const test = () => {
    gameRequest({
      action: 'gameCreate',
      actionArgs: {
        playerNames: ['p1', 'p2'],
        board: 'zelda'
      }
    }).then(resp => console.log(resp)).catch(err => console.error(err))
  }
  return (
    <div>
      Home page
      <ul>
        <li>create a game or join a game</li>
        <li>what this is</li>
      </ul>

      <Button onClick={test}>Hello</Button>
    </div>
  )
};