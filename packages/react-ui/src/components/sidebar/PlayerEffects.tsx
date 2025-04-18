import type { PlayerEffects as PlayerEffectsType } from '@repo/engine';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  effects: PlayerEffectsType
}

/*
  {effects.extraTurns ? <Badge color="blue">{playerStatus.extraTurn}</Badge> : null}
  {effects.skippedTurns.numTurns ? <Badge color="red">{playerStatus.missedTurn}</Badge> : null}
  {effects.mandatorySkips ? <Badge color="blue">{playerStatus.skipMandatory}</Badge> : null}
  {effects.anchors ? <Badge color="blue">{playerStatus.anchor}</Badge> : null}
  {effects.speedModifier.numTurns ?
    <Badge color="blue">{effects.speedModifier.operation}{effects.speedModifier.modifier}</Badge>
  : null}
  {effects.customMandatoryTileIndex > -1 ?
    <Badge color="blue">
      {formatString(playerStatus.customMandatory, { idx: `${effects.customMandatoryTileIndex}` })}
    </Badge>
  : null}
  {effects.moveCondition.ruleId ?
    <Badge color="blue">
      {boardStore.rulesById.get(effects.moveCondition.ruleId)?.condition?.description}
    </Badge>
  : null}
*/
const isNever = (value: never) => { throw new Error(`No effect renderer for ${value}`)};

const getEffectDesc = (effectKeyStr: string, effects: PlayerEffectsType) => {
  const effectKey = effectKeyStr as keyof PlayerEffectsType;
  const strInfo = {
    stringKey: `webapp_effectDescription_${effectKey}`,
    hasEffect: false,
    stringArgs: {},
  };

  switch (effectKey) {
    case 'extraTurns':
        strInfo.hasEffect = effects.extraTurns > 0;
        strInfo.stringArgs = {};
        break;
    case 'mandatorySkips':
        strInfo.hasEffect = effects.mandatorySkips > 0;
        strInfo.stringArgs = {};
        break;
    case 'customMandatoryTileIndex':
        strInfo.hasEffect = effects.customMandatoryTileIndex >= 0;
        strInfo.stringArgs = {};
        break;
    case 'immediateTurns':
        strInfo.hasEffect = effects.immediateTurns > 0;
        strInfo.stringArgs = {};
        break;
    case 'anchors':
        strInfo.hasEffect = effects.anchors > 0;
        strInfo.stringArgs = {};
        break;
    case 'itemIds':
        strInfo.hasEffect = effects.itemIds?.length > 0;
        strInfo.stringArgs = {};
        break;
    case 'skippedTurns':
        strInfo.hasEffect = effects.skippedTurns.numTurns > 0;
        strInfo.stringArgs = {};
        break;
    case 'speedModifier':
        strInfo.hasEffect = effects.speedModifier.numTurns > 0;
        strInfo.stringArgs = {
          operation: effects.speedModifier.operation,
          mod: effects.speedModifier.modifier
        };
        break;
    case 'rollAugmentation':
        strInfo.hasEffect = effects.rollAugmentation.numTurns > 0;
        strInfo.stringArgs = {};
        break;
    case 'moveCondition':
        strInfo.hasEffect = !!effects.moveCondition.ruleId;
        strInfo.stringArgs = {};
        break;
    default:
      return isNever(effectKey);
  }

  return strInfo;
}

export const PlayerEffects = ({ effects }: Props) => {
  const ui = useUI();
  const { getMessage } = useI18n();

  return (
    <ui.Row wrap='wrap' gap={UISize.xs}>
      {Object.keys(effects)
        .map(v => getEffectDesc(v, effects))
        .filter(v => v.hasEffect)
        .map(({ stringKey, stringArgs }) => (
          <ui.Chip key={stringKey}>
            <ui.Text fontSize={UISize.xs}>
              {getMessage(stringKey, stringArgs)}
            </ui.Text>
          </ui.Chip>
      ))}
    </ui.Row>
  );
};