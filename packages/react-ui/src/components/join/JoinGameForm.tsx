import { useState } from 'react';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  joinGame: (gameId: string) => Promise<void>;
  defaultGameId?: string;
}

export const JoinGameForm = ({ joinGame, defaultGameId = '' }: Props) => {
  const ui = useUI();
  const [gameId, setGameId] = useState(defaultGameId);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!gameId) return;

    setFormState('submitting');
    setErrorMessage(null);

    try {
      await joinGame(gameId);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to join game');
      setFormState('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ui.Field label="Game ID">
        <ui.Input
          name="gameId"
          value={gameId}
          onChange={e => setGameId(e.target.value)}
          placeholder="Enter game ID"
        />
      </ui.Field>

      {errorMessage && (
        <ui.Field label="Error">
          <ui.Text>{errorMessage}</ui.Text>
        </ui.Field>
      )}

      <ui.Button type="submit" disabled={!gameId || formState === 'submitting'}>
        Join Game
      </ui.Button>
    </form>
  );
};
