import { PromptAction, type Actions } from '@repo/engine';
import { useEffect, useState } from 'react';
import { useBoardI18n, useCurrentGame } from '../../context/GameContext';
import { useI18n } from '../../context/LocalizationContext';
import { UIEnvironment, UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { PromptActionsForPlayer } from './PromptActionsForPlayer';
import { PromptCloseButton } from './PromptCloseButton';
import { RuleHelperText } from './RuleHelperText';
import { TileCutout } from './TileCutout';
import { Toolbar } from './Toolbar';

// Returns the first promptClose action that's found (should only be one) along with its playerId
const getPromptCloseActionsWithPlayerId = (availableActions: Actions) => {
  return Object.entries(availableActions).flatMap(([playerId, actionObj]) =>
    actionObj.promptActions
      .filter((action) => action.type === 'promptClose')
      .map((action) => ({ playerId, action })),
  )[0];
};

const filterOutPromptClose = (actions: PromptAction[]) =>
  actions.filter((a) => a.type !== 'promptClose');

const flexProps: Record<string, Partial<Parameters<UIEnvironment['Flex']>[0]>> = {
  s: {
    direction: 'column',
    justifyContent: 'space-between',
  },
  l: {
    direction: 'row',
    wrap: 'wrap',
    justifyContent: 'space-between',
  },
};

export const Prompt = () => {
  const ui = useUI();
  const [showMap, setShowMap] = useState(false);
  const { getNullableMessage: engineGetMessage } = useI18n();
  const { getNullableMessage: boardGetMessage } = useBoardI18n();
  const game = useCurrentGame();
  const { screenSize } = useScreenSize();
  const { prompt, availableActions, metadata, players } = game;
  const curPlayerName = players[metadata.currentPlayerId]?.name;
  const hasPrompt = !!prompt;

  // When the prompt disappears, reset showMap
  useEffect(() => {
    if (!hasPrompt) setShowMap(false);
  }, [hasPrompt]);

  if (!hasPrompt) return null;
  const promptCloseAction = getPromptCloseActionsWithPlayerId(availableActions);
  const headerText =
    engineGetMessage(prompt?.messageOverride?.stringId, prompt?.messageOverride?.stringArgs) ||
    boardGetMessage(prompt?.messageOverride?.stringId, prompt?.messageOverride?.stringArgs) ||
    boardGetMessage(prompt?.ruleId) ||
    '<Error!>';

  const showMapButton = (
    <ui.Button variant="secondary" onClick={() => setShowMap((prev) => !prev)}>
      {engineGetMessage(showMap ? 'webapp_showPrompt' : 'webapp_showMap')}
    </ui.Button>
  );
  const promptCloseButton = (
    <PromptCloseButton
      playerId={promptCloseAction?.playerId}
      promptCloseAction={promptCloseAction?.action}
    />
  );

  return (
    <>
      <ui.Modal
        isOpen={hasPrompt && !showMap}
        isFullScreen={screenSize === 's'}
        headerText={
          <ui.Row gap={UISize.m} alignItems="center">
            <ui.Avatar name={curPlayerName!} height="30px" width="30px" />
            {headerText}
          </ui.Row>
        }
        footerContent={screenSize === 'l' ? promptCloseButton : undefined}
      >
        {prompt.subsequentRuleIds?.map((rId) => (
          <ui.Text key={rId}>
            <h3>➡️ {boardGetMessage(rId)}</h3>
          </ui.Text>
        ))}

        <ui.Flex {...flexProps[screenSize]}>
          <TileCutout ruleId={prompt.ruleId} />
          <RuleHelperText ruleId={prompt.ruleId} />
        </ui.Flex>

        <ui.Flex {...flexProps[screenSize]}>
          {/* For each player, render all their available actions */}
          {Object.entries(availableActions).map(([playerId, actionObj]) => (
            <ui.Col
              key={playerId}
              flex={screenSize === 'l' ? '0 1 calc(50% - 0.5rem)' : '1 1 100%'}
              marginBottom={UISize.m}
            >
              <PromptActionsForPlayer
                actions={filterOutPromptClose(actionObj.promptActions)}
                playerId={playerId}
              />
            </ui.Col>
          ))}

          {screenSize === 's' && (
            <ui.Row justifyContent="flex-end" gap={UISize.m}>
              {showMapButton}
              {promptCloseButton}
            </ui.Row>
          )}
        </ui.Flex>
      </ui.Modal>
      {(screenSize === 'l' || showMap) && <Toolbar buttons={[showMapButton]} />}
    </>
  );
};
