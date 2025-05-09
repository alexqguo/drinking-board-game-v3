import { BoardModule } from '@repo/schemas';
import { useEffect, useState } from 'react';
import { useAppActions } from '../../context/AppActionsContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  // todo- fix unknown
  createAndJoinGame: (board: string, playerNames: string[]) => Promise<unknown>;
  listGames: () => Promise<BoardModule[]>;
}

interface CreateGameInputs {
  board?: string;
  players?: string[];
}

const MAX_PLAYERS = 8;

const processFormData = (fd: FormData): CreateGameInputs => {
  const board = fd.get('board') as string;
  const players = [];
  for (let i = 0; i < 8; i++) {
    const player = fd.get(`players[${i}]`);
    if (player) players.push(player.toString());
  }

  return { board, players };
};

export const CreateGameForm = ({ createAndJoinGame, listGames }: Props) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [formSubmissionState, setFormSubmissionState] = useState<'idle' | 'submitting'>('idle');
  const [availableBoards, setAvailableBoards] = useState<{
    isLoading: boolean;
    error?: Error;
    data?: BoardModule[];
  }>({ isLoading: true });
  const [playerCount, setPlayerCount] = useState(2);
  const updateTheme = useAppActions((ctx) => ctx.actions.updateUIThemeColor);

  const isSubmitting = formSubmissionState === 'submitting';
  const handleChange = (evt: React.FormEvent<HTMLFormElement>) => {
    const prevBoard = formData.get('board');
    const newFormData = new FormData(evt.currentTarget);
    const { board, players } = processFormData(newFormData);
    const numUniquePlayers = new Set(players).size;
    const isValid = !!board && numUniquePlayers >= 2;

    setFormData(newFormData);
    setIsValid(isValid);

    // Update theme if board changed
    if (prevBoard !== newFormData.get('board')) {
      const newColor = availableBoards.data?.find((b) => b.metadata.id === newFormData.get('board'))
        ?.metadata.colorTheme;
      if (newColor) updateTheme(newColor);
    }
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormSubmissionState('submitting');
    const { board, players } = processFormData(new FormData(evt.currentTarget));

    // Assume they are valid since you cannot submit if they are not
    await createAndJoinGame(board!, players!);
  };

  const addPlayer = () => {
    if (playerCount < MAX_PLAYERS) {
      setPlayerCount(playerCount + 1);
    }
  };

  useEffect(() => {
    listGames()
      .then((data) => {
        setAvailableBoards({
          isLoading: false,
          data,
        });
      })
      .catch((e) => {
        setAvailableBoards({
          isLoading: false,
          data: [],
          error: e,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <ui.Col gap={UISize.xl} marginTop={UISize.xl} marginBottom={UISize.xl}>
        <ui.RadioField
          label={getMessage('webapp_chooseGameLabel')}
          value={(formData.get('board') as string) || ''}
        >
          {availableBoards.isLoading && <ui.Spinner size={UISize.m} />}
          {availableBoards.data?.map((b) => (
            <ui.RadioCard
              key={b.metadata.id}
              value={b.metadata.id}
              title={b.metadata.displayName}
              description={b.metadata.description}
              name="board"
              disabled={isSubmitting}
            />
          ))}
        </ui.RadioField>

        <ui.Field label={getMessage('webapp_addPlayersLabel')}>
          {Array.from({ length: playerCount }).map((_, index) => (
            <ui.Input
              key={index}
              name={`players[${index}]`}
              autoComplete="off"
              value={formData.get(`players[${index}]`) as string}
              disabled={isSubmitting}
            />
          ))}
          <ui.Row>
            <ui.Button
              size={UISize.xs}
              type="button"
              onClick={addPlayer}
              disabled={playerCount >= MAX_PLAYERS || isSubmitting}
            >
              +
            </ui.Button>
          </ui.Row>
        </ui.Field>
        <div onClick={() => updateTheme('green')}>clickme</div>

        <ui.Row>
          <ui.Button type="submit" disabled={!isValid || isSubmitting}>
            {getMessage('webapp_createGameBtn')}
            {isSubmitting && <ui.Spinner size={UISize.s} />}
          </ui.Button>
        </ui.Row>
      </ui.Col>
    </form>
  );
};
