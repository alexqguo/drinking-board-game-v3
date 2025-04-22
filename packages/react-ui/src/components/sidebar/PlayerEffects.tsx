import type { PlayerEffects as PlayerEffectsType } from '@repo/engine';
import { useBoardI18n } from '../../context/GameContext';
import { I18n, useI18n } from '../../context/LocalizationContext';
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

const getEffectDesc = (
  effectKeyStr: string,
  effects: PlayerEffectsType,
  i18n: I18n,
  boardI18n: I18n,
) => {
  const effectKey = effectKeyStr as keyof PlayerEffectsType;
  const strKey = `webapp_effectDescription_${effectKey}`;
  const strInfo = {
    key: strKey, // just for react rendering
    hasEffect: false,
    getString: () => '',
  };

  switch (effectKey) {
    case 'extraTurns':
        strInfo.hasEffect = effects.extraTurns > 0;
        strInfo.getString = () => i18n.getMessage(strKey);
        break;
    case 'mandatorySkips':
        strInfo.hasEffect = effects.mandatorySkips > 0;
        strInfo.getString = () => i18n.getMessage(strKey);
        break;
    case 'customMandatoryTileIndex':
        strInfo.hasEffect = effects.customMandatoryTileIndex >= 0;
        strInfo.getString = () => i18n.getMessage(strKey, { idx: effects.customMandatoryTileIndex });
        break;
    case 'immediateTurns':
        strInfo.hasEffect = effects.immediateTurns > 0;
        strInfo.getString = () => i18n.getMessage(strKey);
        break;
    case 'anchors':
        strInfo.hasEffect = effects.anchors > 0;
        // todo
        strInfo.getString = () => i18n.getMessage(strKey);
        break;
    case 'itemIds':
        strInfo.hasEffect = effects.itemIds?.length > 0;
        strInfo.getString = () => {
          //todo
          return effects.itemIds.join(', ')
        }
        break;
    case 'skippedTurns':
        strInfo.hasEffect = effects.skippedTurns.numTurns > 0;
        strInfo.getString = () => i18n.getMessage(strKey);
        break;
    case 'speedModifier':
        strInfo.hasEffect = effects.speedModifier.numTurns > 0;
        strInfo.getString = () => i18n.getMessage(strKey, {
          operation: effects.speedModifier.operation,
          mod: effects.speedModifier.modifier
        });
        break;
    case 'rollAugmentation':
        strInfo.hasEffect = effects.rollAugmentation.numTurns > 0;
        // todo
        strInfo.getString = () => i18n.getMessage(strKey);
        break;
    case 'moveCondition':
        strInfo.hasEffect = !!effects.moveCondition.ruleId;
        // todo. needs boardI18n
        strInfo.getString = () => effects.moveCondition.ruleId;
        break;
    default:
      return isNever(effectKey);
  }

  return strInfo;
}

export const PlayerEffects = ({ effects }: Props) => {
  const ui = useUI();
  const i18n = useI18n();
  const boardI18n = useBoardI18n();

  return (
    <ui.Row wrap='wrap' gap={UISize.xs}>
      {Object.keys(effects)
        .map(k => getEffectDesc(k, effects, i18n, boardI18n))
        .filter(e => e.hasEffect)
        .map(({ getString, key }) => (
          <ui.Chip key={key}>
            <ui.Text fontSize={UISize.xs}>
              {getString()}
            </ui.Text>
          </ui.Chip>
      ))}
    </ui.Row>
  );
};