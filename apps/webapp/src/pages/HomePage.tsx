import { Container } from '@chakra-ui/react';
import { DonationWidget } from '@repo/react-ui/components/donation/DonationWidget.jsx';
import { CreateGameForm } from '@repo/react-ui/components/homepage/CreateGameForm.jsx';
import { Introduction } from '@repo/react-ui/components/homepage/Introduction.jsx';
import { BoardModule } from '@repo/schemas';
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
          board,
        },
      })
        .then((resp) => {
          console.info(`Game created. Redirecting to /games/${resp.data.gameId}`);
          setLocation(`/games/${resp.data.gameId}`);
          // No need to resolve here actually
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  const listGames = (): Promise<BoardModule[]> => {
    return new Promise((resolve, reject) => {
      gameRequest({
        action: 'listBoards',
        actionArgs: {},
      })
        .then((response) => {
          resolve(response.data.boardModules || []);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  return (
    <Container maxWidth={800}>
      <Introduction />
      <CreateGameForm createAndJoinGame={createAndJoinGame} listGames={listGames} />
      <DonationWidget />
    </Container>
  );
};
