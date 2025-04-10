import { Container } from '@chakra-ui/react';
import { CreateGameForm } from '@repo/react-ui/components/homepage/CreateGameForm.jsx';
import { Introduction } from '@repo/react-ui/components/homepage/Introduction.jsx';
import { useLocation } from 'wouter';
import { gameRequest } from '../firebase/functions';

export const HomePage = () => {
  const [, setLocation] = useLocation();

  const createAndJoinGame = (board: string, playerNames: string[]) => {
    return new Promise((resolve, reject) => {
      gameRequest({
        action: 'gameCreate',
        actionArgs: {
          playerNames,
          board
        }
      }).then(resp => {
        console.log('asdf game created', resp);
        setLocation(`/games/${resp.data.gameId}`);
        // No need to resolve here actually
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
  };

  return (
    <Container maxWidth={800}>
      <Introduction />
      <CreateGameForm createAndJoinGame={createAndJoinGame} />
    </Container>
  )
};