import { BoardName } from '@repo/enums';
import { useState } from 'react';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  // todo- fix unknown
  createAndJoinGame: (board: string, playerNames: string[]) => Promise<unknown>;
}

interface CreateGameInputs {
  board?: string;
  players?: string[];
}

const processFormData = (fd: FormData): CreateGameInputs => {
  const board = fd.get('board') as string;
  const players = [];
  for (let i = 0; i < 2; i++) {
    const player = fd.get(`players[${i}]`);
    if (player) players.push(player.toString());
  }

  return { board, players };
}

export const CreateGameForm = ({
  createAndJoinGame,
}: Props) => {
  const ui = useUI();
  const [isValid, setIsValid] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting'>('idle');

  const handleChange = (evt: React.FormEvent<HTMLFormElement>) => {
    const { board, players } = processFormData(new FormData(evt.currentTarget));
    const isValid = !!board && new Set(players).size >= 2;
    setIsValid(isValid);
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormState('submitting');
    const { board, players } = processFormData(new FormData(evt.currentTarget));

    // Assume they are valid since you cannot submit if they are not
    await createAndJoinGame(board!, players!);
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      {formState}
      <ui.RadioField
        label="select game"
      >
        {Object.values(BoardName).map((n) => (
          <ui.RadioCard
            key={n}
            value={n}
            title={n}
            description={n}
            name="board"
          />
        ))}
      </ui.RadioField>

      <ui.Field label="who's playing">
        <ui.Input name="players[0]" autoComplete="off" />
        <ui.Input name="players[1]" autoComplete="off" />
      </ui.Field>

      <ui.Button
        type="submit"
        disabled={!isValid}
      >
        Let's go!
      </ui.Button>
    </form>
  );
};