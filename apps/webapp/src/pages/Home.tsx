import { UIEnvironmentContext } from '@repo/ui/context/UIEnvironmentContext';
import { useContext } from 'react';
import { gameRequest } from '../firebase/initialize';

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

      <Button onClick={test}>Hello</Button>
    </div>
  )
};