import { type PlayerData } from '@repo/engine';
import React, { useState } from 'react';
import { useBoardI18n, useCurrentPlayers } from '../../context/GameContext';
import { I18n, useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { ActionComponentProps } from './PromptActionsForPlayer';
import { testIds } from '../../constants/testIds';

/**
 * This component can be invoked for player selection or custom selection.
 * For player selection, just take the player name.
 * For custom selection, it can be either an item or a rule. Both derived from the board.
 */

const getLabel = (id: string, actionType: string, players: PlayerData, boardI18n: I18n) => {
  if (actionType === 'promptSelectPlayer' || actionType === 'promptGrantSelectPlayer')
    return players[id]?.name ?? id;

  // As a last resort, try looking up the ID in the board's I18n values
  // This will be the case for items and rule choices
  return boardI18n.getMessage(id);
};

export const SelectionAction: React.FC<ActionComponentProps> = ({
  action,
  handleAction,
  hasPermissions,
  isSubmitting,
}) => {
  const ui = useUI();
  const i18n = useI18n();
  const boardI18n = useBoardI18n();
  const players = useCurrentPlayers();
  const [curValue, setCurValue] = useState(action.result);
  const isSubmitted = !!action.result;
  const formattedOptions = (action.candidateIds ?? []).map((id) => ({
    value: id,
    label: getLabel(id, action.type, players, boardI18n),
  }));

  // TODO- this needs to handle submitting and done submitting disabled states
  const handleClick = () => {
    handleAction(action, curValue!);
  };

  return (
    <ui.Col gap={UISize.m}>
      <ui.Row wrap="wrap">
        <ui.RadioField label={i18n.getMessage('promptSelectCustom')} data-testid={testIds.promptSelectionField}>
          <div>
            <ui.RadioGroup
              options={formattedOptions}
              value={String(curValue)}
              disabled={!hasPermissions || isSubmitted}
              onChange={(newValue) => setCurValue(newValue)}
              data-testid={testIds.promptSelectionRadio(action.type)}
            />
          </div>
        </ui.RadioField>
      </ui.Row>

      {isSubmitted ? null : (
        <ui.Row>
          <ui.Button
            size={UISize.xs}
            disabled={!hasPermissions || !curValue || isSubmitting}
            onClick={handleClick}
            data-testid={testIds.promptSelectionConfirmBtn(action.type)}
          >
            {i18n.getMessage('webapp_promptConfirm')}
            {isSubmitting && <ui.Spinner size={UISize.xs} />}
          </ui.Button>
        </ui.Row>
      )}
    </ui.Col>
  );
};
