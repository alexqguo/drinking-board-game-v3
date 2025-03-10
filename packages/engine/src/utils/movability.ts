import { Context } from '../context.js';
import {
  MoveConditionResult,
  SpeedModifier,
} from '../gamestate/gamestate.types.js';
import { findRuleHandler } from '../rules/index.js';
import {
  DiceRollType,
  ModifierOperation,
  MoveConditionSchema,
} from '../rules/rules.types.js';
import { defaultEffects } from './defaults.js';

const isDiceRollSuccessful = (cond: MoveConditionSchema, rolls: number[]) => {
  if (!rolls.length) return false;
  const { diceRolls, criteria } = cond;

  // If the condition only requires one roll, success is when the first roll is in the criteria
  if (!diceRolls || diceRolls.numRequired === 1) {
    return criteria.indexOf(rolls[0]!) !== -1;
  }

  // If the dice roll type is allMatch, then every roll must be listed in criteria
  if (diceRolls && diceRolls.type === DiceRollType.allMatch) {
    return rolls.every((roll: number) => criteria.indexOf(roll) !== -1);
  }

  // Shouldn't happen, but let the player proceed if so
  return true;
}

export const canPlayerMove = (
  ctx: Context,
  playerId: string,
  condition: MoveConditionSchema,
  rolls: number[]
): MoveConditionResult => {
  const isSuccessfulRoll = isDiceRollSuccessful(condition, rolls);
  if (!isSuccessfulRoll) {
    /**
     * A bit confusing. If successes are required, you still have to achieve the criteria on your next turn.
     * However if successes are NOT required, even if you fail you will move normally on your next turn.
     * So in that case we clear the condition even in a failure case.
     */
    if (!condition.numSuccessesRequired) {
      ctx.update_setPlayerEffectsPartial(playerId, {
        moveCondition: defaultEffects.moveCondition,
      })
    }

    if (condition.consequence) {
      // This is only used in Gen 2 Ilex Forest
      const handler = findRuleHandler(ctx, condition.consequence);
      handler.execute();
    }

    return {
      canMove: false,
      message: 'TODO! not a successful roll',
      // message: formatString(en.moveCondition.notMet, {
      //   condition: condition.description,
      //   rollStr: rolls.join(', '),
      // }),
    }
  }

  const player = ctx.nextGame.players[playerId]!;
  const newSuccessCount = player.effects.moveCondition.numCurrentSuccesses + 1;

  // Successful roll and num successes met
  if (!condition.numSuccessesRequired || newSuccessCount >= condition.numSuccessesRequired) {
    ctx.update_setPlayerEffectsPartial(playerId, {
      moveCondition: defaultEffects.moveCondition,
    })

    return {
      canMove: true,
      message: '', // Game engine will ignore it
    }
  }

  // Successful roll but total num successes not yet met
  // Increment successes on player
  ctx.update_setPlayerEffectsPartial(playerId, {
    moveCondition: {
      ...player.effects.moveCondition,
      numCurrentSuccesses: newSuccessCount,
    }
  })

  return {
    canMove: false,
    message: 'TODO! successful roll but have yet to reach successes required'
    // message: formatString(en.moveCondition.met, {
    //   cur: `${newSuccessCount}`,
    //   total: `${condition.numSuccessesRequired}`,
    // }),
  };
}

export const getAdjustedRoll = (originalRoll: number, mod: SpeedModifier): number => {
  if (!mod) return originalRoll;
  const { operation, modifier } = mod;

  switch (operation) {
    case ModifierOperation.addition:
      return originalRoll + modifier;

    case ModifierOperation.subtraction:
      return originalRoll - modifier;

    case ModifierOperation.multiplication:
      return Math.ceil(originalRoll * modifier);

    case ModifierOperation.equal:
    default:
      return originalRoll;
  }
}