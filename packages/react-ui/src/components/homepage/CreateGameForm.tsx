import { BoardMetadata } from '@repo/schemas';
import { useEffect, useState } from 'react';
import {
  useCreateAndJoinGameAction,
  useListGamesAction,
  useUpdateUIThemeAction,
} from '../../context/AppActionsContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

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

export const CreateGameForm = () => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [formSubmissionState, setFormSubmissionState] = useState<'idle' | 'submitting'>('idle');
  const [availableBoards, setAvailableBoards] = useState<{
    isLoading: boolean;
    error?: Error;
    data?: BoardMetadata[];
  }>({ isLoading: true });
  const [playerCount, setPlayerCount] = useState(2);
  const updateUITheme = useUpdateUIThemeAction();
  const createAndJoinGame = useCreateAndJoinGameAction();
  const listGames = useListGamesAction();

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
      const newColor = availableBoards.data?.find(
        (b) => b.id === newFormData.get('board'),
      )?.colorTheme;
      if (newColor) updateUITheme(newColor);
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
    console.log('asdf create game form');
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
              key={b.id}
              value={b.id}
              title={b.displayName}
              description={b.description}
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
              onChange={() => {} /* Suppress warnings */}
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
