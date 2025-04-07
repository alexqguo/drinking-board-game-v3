import { useContext } from 'react';
import { UIEnvironmentContext } from '../context/UIEnvironmentContext';
import { CreateGameForm } from './CreateGameForm';
import { Introduction } from './Introduction';

interface Props {
  createAndJoinGame: (playerNames: string[], board: string) => Promise<unknown>;
}

export const Home = ({ createAndJoinGame }: Props) => {
  const ui = useContext(UIEnvironmentContext);

  return (
    <ui.PageContainer maxWidth={800}>
      <Introduction />
      <CreateGameForm createAndJoinGame={createAndJoinGame} />
    </ui.PageContainer>
  );
}