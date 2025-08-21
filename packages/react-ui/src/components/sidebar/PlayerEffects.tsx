import type { BoardSchema, PlayerEffects as PlayerEffectsType } from '@repo/schemas';
import { findRuleById } from '@repo/schemas';
import { ReactElement } from 'react';
import { useBoardI18n, useCurrentBoard } from '../../context/GameContext';
import { I18n, useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  effects: PlayerEffectsType;
  zoneId: string | null;
}

const isNever = (value: never) => {
  throw new Error(`No effect renderer for ${value}`);
};

const chunk = (arr: ReactElement[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

const getEffectDesc = (
  effectKeyStr: string,
  effects: PlayerEffectsType,
  i18n: I18n,
  boardI18n: I18n,
  boardSchema: BoardSchema,
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
      // todo - gen 2/3
      strInfo.getString = () => i18n.getMessage(strKey);
      break;
    case 'itemIds':
      strInfo.hasEffect = effects.itemIds?.length > 0;
      strInfo.getString = () => {
        // TODO- show one chip per item?
        return effects.itemIds.map((id) => boardI18n.getMessage(id)).join(', ');
      };
      break;
    case 'skippedTurns':
      strInfo.hasEffect = effects.skippedTurns.numTurns > 0;
      strInfo.getString = () => i18n.getMessage(strKey);
      break;
    case 'speedModifier':
      strInfo.hasEffect = effects.speedModifier.numTurns > 0;
      strInfo.getString = () =>
        i18n.getMessage(strKey, {
          operation: effects.speedModifier.operation,
          mod: effects.speedModifier.modifier,
        });
      break;
    case 'rollAugmentation':
      strInfo.hasEffect = effects.rollAugmentation.numTurns > 0;
      strInfo.getString = () =>
        i18n.getMessage(strKey, {
          operation: effects.rollAugmentation.operation,
          mod: effects.rollAugmentation.modifier,
        });
      break;
    case 'moveCondition':
      strInfo.hasEffect = !!effects.moveCondition.ruleId;
      strInfo.getString = () => boardI18n.getMessage(effects.moveCondition.descriptionStrId);
      break;
    case 'turnStartRule':
      const ruleId = effects.turnStartRule?.rule.id;
      const rule = findRuleById(boardSchema, ruleId!);
      strInfo.hasEffect = !!effects.turnStartRule && effects.turnStartRule.numTurns > 0;
      strInfo.getString = () => boardI18n.getMessage(`${rule?.descriptionTextId}` || ruleId);
      break;
    default:
      return isNever(effectKey);
  }

  return strInfo;
};

export const PlayerEffects = ({ effects, zoneId }: Props) => {
  const ui = useUI();
  const i18n = useI18n();
  const boardI18n = useBoardI18n();
  const boardSchema = useCurrentBoard();

  // CSS I wanted didn't work, so chunking chips into columns of 2
  const getChips = () => {
    const chipsFlattened = [];
    if (zoneId) {
      chipsFlattened.push(
        <ui.Chip color="purple">
          <ui.Text fontSize={UISize.xs}>{boardI18n.getMessage(zoneId)}</ui.Text>
        </ui.Chip>,
      );
    }
    chipsFlattened.push(
      ...Object.keys(effects)
        .map((k) => getEffectDesc(k, effects, i18n, boardI18n, boardSchema))
        .filter((e) => e.hasEffect)
        .map(({ getString, key }) => (
          <ui.Chip key={key}>
            <ui.Text fontSize={UISize.xs}>{getString()}</ui.Text>
          </ui.Chip>
        )),
    );
    return chunk(chipsFlattened, 2);
  };

  return (
    <ui.Row gap={UISize.xs}>
      {getChips().map(([c1, c2]) => (
        <ui.Col gap={UISize.xs}>
          {c1}
          {c2}
        </ui.Col>
      ))}
    </ui.Row>
  );
};
