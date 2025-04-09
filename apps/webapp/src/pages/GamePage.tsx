import { Game } from '@repo/ui/components/Game.jsx'
import { GamePageContainer } from '@repo/ui/components/GamePageContainer.jsx'
import { GameSidebar } from '@repo/ui/components/GameSidebar.jsx'
import { FirebaseGameProvider } from '../providers/FirebaseGameProvider'

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