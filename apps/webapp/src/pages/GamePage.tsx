import { Game } from '@repo/ui/components/Game.jsx'
import { FirebaseGameProvider } from '../providers/FirebaseGameProvider'

interface Props {
  gameId: string
}

export const GamePage: React.FC<Props> = ({ gameId }) => {

  return (
    <FirebaseGameProvider gameId={gameId}>
      <Game />
    </FirebaseGameProvider>
  )
}