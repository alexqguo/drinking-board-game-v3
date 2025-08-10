import { BoardMetadata } from '@repo/schemas';
import { useEffect, useState } from 'react';
import { testIds } from '../../constants/testIds';
import {
  useCreateAndJoinGameAction,
  useListGamesAction,
  useUpdateUIThemeAction,
} from '../../context/AppActionsContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

const MAX_PLAYERS = 8;

export const CreateGameForm = () => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerInput, setNewPlayerInput] = useState<string>('');
  const [formSubmissionState, setFormSubmissionState] = useState<'idle' | 'submitting'>('idle');
  const [availableBoards, setAvailableBoards] = useState<{
    isLoading: boolean;
    error?: Error;
    data?: BoardMetadata[];
  }>({ isLoading: true });
  const updateUITheme = useUpdateUIThemeAction();
  const createAndJoinGame = useCreateAndJoinGameAction();
  const listGames = useListGamesAction();

  const isSubmitting = formSubmissionState === 'submitting';
  const numUniquePlayers = new Set(players).size;
  const isValid = !!selectedBoard && numUniquePlayers >= 2;

  const handleBoardChange = (boardId: string) => {
    const prevBoard = selectedBoard;
    setSelectedBoard(boardId);

    // Update theme if board changed
    if (prevBoard !== boardId) {
      const newColor = availableBoards.data?.find((b) => b.id === boardId)?.colorTheme;
      if (newColor) updateUITheme(newColor);
    }
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isValid) return;

    setFormSubmissionState('submitting');
    await createAndJoinGame(selectedBoard, players);
  };

  const addPlayer = () => {
    if (
      newPlayerInput.trim() &&
      players.length < MAX_PLAYERS &&
      !players.includes(newPlayerInput.trim())
    ) {
      setPlayers([...players, newPlayerInput.trim()]);
      setNewPlayerInput('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleNewPlayerInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      addPlayer();
    }
  };

  useEffect(() => {
    listGames()
      .then((data) => {
        setAvailableBoards({
          isLoading: false,
          data,
        });
        // Auto-select first board and set its theme
        const firstBoard = data[0];
        if (firstBoard) {
          setSelectedBoard(firstBoard.id);
          updateUITheme(firstBoard.colorTheme ?? '');
        }
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
    <form onSubmit={handleSubmit}>
      <ui.Col gap={UISize.xl} marginTop={UISize.xl} marginBottom={UISize.xl}>
        <ui.RadioField
          label={getMessage('webapp_chooseGameLabel')}
          value={selectedBoard}
          onValueChange={handleBoardChange}
          data-testid={testIds.boardSelectionField}
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
              data-testid={testIds.boardOption(b.id)}
            />
          ))}
        </ui.RadioField>

        <ui.Field label={getMessage('webapp_addPlayersLabel')}>
          {players.length > 0 && (
            <ui.Row gap={UISize.s} margin={UISize.s}>
              {players.map((player, index) => (
                <ui.Chip
                  key={player}
                  isCloseable
                  onClose={() => removePlayer(index)}
                  data-testid={testIds.playerChip(index)}
                >
                  {player}
                </ui.Chip>
              ))}
            </ui.Row>
          )}

          <ui.Row gap={UISize.m} width="100%" alignItems="center">
            <ui.Col flex={1}>
              <ui.Input
                name="newPlayer"
                autoComplete="off"
                value={newPlayerInput}
                disabled={isSubmitting}
                onChange={(e) => setNewPlayerInput(e.target.value)}
                onKeyDown={handleNewPlayerInputKeyDown}
                placeholder={getMessage('webapp_playerNamePlaceholder')}
                data-testid={testIds.playerNameInput}
              />
            </ui.Col>
            <ui.Col>
              <ui.Button
                size={UISize.xs}
                type="button"
                onClick={addPlayer}
                disabled={players.length >= MAX_PLAYERS || isSubmitting || !newPlayerInput.trim()}
                data-testid={testIds.addPlayerBtn}
              >
                +
              </ui.Button>
            </ui.Col>
          </ui.Row>
        </ui.Field>

        <ui.Row>
          <ui.Button
            type="submit"
            disabled={!isValid || isSubmitting}
            data-testid={testIds.createGameBtn}
          >
            {getMessage('webapp_createGameBtn')}
            {isSubmitting && <ui.Spinner size={UISize.s} />}
          </ui.Button>
        </ui.Row>
      </ui.Col>
    </form>
  );
};
