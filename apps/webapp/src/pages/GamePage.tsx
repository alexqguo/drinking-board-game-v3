import { Game } from '@repo/react-ui/components/Game.jsx';
import { GamePageContainer } from '@repo/react-ui/components/GamePageContainer.jsx';
import { GameSidebar } from '@repo/react-ui/components/GameSidebar.jsx';
import { FirebaseGameProvider } from '../providers/FirebaseGameProvider';

interface Props {
  gameId: string
}

export const GamePage = ({ gameId }: Props) => {

  return (
    <FirebaseGameProvider gameId={gameId}>
      <GamePageContainer
        sidebarContent={<GameSidebar />}
        mainContent={<Game />}
      />
    </FirebaseGameProvider>
  )
}