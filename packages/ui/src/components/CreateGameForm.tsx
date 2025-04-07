import { FormEventHandler, useContext, useState } from 'react';
import { UIEnvironmentContext } from '../context/UIEnvironmentContext';

interface Props {
  // todo- fix unknown
  createAndJoinGame: (playerNames: string[], board: string) => Promise<unknown>;
}

export const CreateGameForm = ({
  createAndJoinGame,
}: Props) => {
  const ui = useContext(UIEnvironmentContext);
  const [formState, setFormState] = useState<'idle' | 'submitting'>('idle');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormState('submitting');

    await createAndJoinGame(
      ['player1', 'player2'],
      'zelda'
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {formState}
      <ui.Field>
        <ui.FieldLabel>select game</ui.FieldLabel>
        <ui.Input></ui.Input>
      </ui.Field>
      <ui.Button type="submit">Hello world</ui.Button>
    </form>
  );
};