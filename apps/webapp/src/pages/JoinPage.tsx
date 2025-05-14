import { Container } from '@chakra-ui/react';
import { JoinGameForm } from '@repo/react-ui/components/join/JoinGameForm.jsx';

export const JoinPage = () => {
  // Get gameId from URL parameter if present
  const params = new URLSearchParams(window.location.search);
  const urlGameId = params.get('gameId');

  // const handleJoinGame = async (gameId: string) => {
  //   const game = await getGame(gameId);
  //   if (!game) {
  //     throw new Error('Game not found');
  //   }
  //   setLocation(`/games/${gameId}`);
  // };

  return (
    <Container maxWidth={800}>
      <JoinGameForm defaultGameId={urlGameId ?? ''} />
    </Container>
  );
};
