interface Props {
  gameId: string
}

export const GamePage: React.FC<Props> = ({ gameId }) => {

  return (
    <div>main game page: {gameId}</div>
  )
}