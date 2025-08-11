import { useContext, useState } from 'react';
import { useCurrentPlayers } from '../context/GameContext';
import { useI18n } from '../context/LocalizationContext';
import { UISize, useUI } from '../context/UIEnvironmentContext';
import { UserContext } from '../context/UserContext';
import { testIds } from '../constants/testIds';

interface Props {
  isOpen: boolean;
}

export const RoleSelectionModal = ({ isOpen }: Props) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const userContext = useContext(UserContext);
  const players = useCurrentPlayers();
  const [selectedRole, setSelectedRole] = useState<string>('host');

  const handleContinue = () => {
    userContext.setSelectedRole(selectedRole);
  };

  const roleOptions = [
    {
      value: 'host',
      label: getMessage('webapp_roleSelection_hostLabel'),
    },
    ...Object.values(players).map((player) => ({
      value: player.id,
      label: `👤 ${player.name}`,
    })),
  ];

  return (
    <ui.Modal
      isOpen={isOpen}
      headerText={getMessage('webapp_roleSelection_title')}
      footerContent={
        <ui.Button onClick={handleContinue} variant="primary" data-testid={testIds.roleContinueBtn}>
          {getMessage('webapp_roleSelection_continue')}
        </ui.Button>
      }
    >
      <ui.Col gap={UISize.m}>
        <ui.Text>{getMessage('webapp_roleSelection_description')}</ui.Text>

        <ui.Col gap={UISize.s}>
          <ui.Text fontSize={UISize.s} color="gray">
            <strong>{getMessage('webapp_roleSelection_hostLabel')}:</strong>{' '}
            {getMessage('webapp_roleSelection_hostDescription')}
          </ui.Text>
          <ui.Text fontSize={UISize.s} color="gray">
            <strong>{getMessage('webapp_roleSelection_playerLabel')}:</strong>{' '}
            {getMessage('webapp_roleSelection_playerDescription')}
          </ui.Text>
        </ui.Col>

        <ui.RadioField
          label={getMessage('webapp_roleSelection_fieldLabel')}
          data-testid={testIds.roleSelectionField}
        >
          <ui.RadioGroup
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            data-testid={testIds.roleSelectionRadio}
          />
        </ui.RadioField>
      </ui.Col>
    </ui.Modal>
  );
};
