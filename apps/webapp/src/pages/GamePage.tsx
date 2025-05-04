import { Game } from '@repo/react-ui/components/Game.jsx';
import { GamePageContainer } from '@repo/react-ui/components/GamePageContainer.jsx';
import { GameSidebar } from '@repo/react-ui/components/sidebar/GameSidebar.jsx';
import { FirebaseGameProvider } from '../providers/FirebaseGameProvider';
import { FirebaseMessagesProvider } from '../providers/FirebaseMessagesProvider';

interface Props {
  gameId: string;
}

export const GamePage = ({ gameId }: Props) => {
  return (
    <FirebaseGameProvider gameId={gameId}>
      <FirebaseMessagesProvider gameId={gameId}>
        <GamePageContainer sidebarContent={<GameSidebar />} mainContent={<Game />} />
      </FirebaseMessagesProvider>
    </FirebaseGameProvider>
  );
};
