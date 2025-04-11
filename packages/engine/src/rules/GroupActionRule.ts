import { ActionType } from '@repo/enums';
import { PromptAction } from '../actions/actions.types.js';
import { createNActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { GroupActionRule, RuleHandlerFactory, RuleType } from './rules.types.js';

/**
 * This is a bit of a hack catchall rule for any time each player needs to do something collectively.
 * There are two use cases right now:
 * 1. Group rolls- everyone rolls a die and that's it (bug catching contest only)
 * 2. Group item selections- everyone selects an item to acquire (starter selection)
 */
export const handler: RuleHandlerFactory<GroupActionRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { allPlayerIds } = ctx;
    const { diceRolls, itemIds } = rule;

    allPlayerIds.forEach(pid => {
      if (diceRolls) {
        ctx.update_setPlayerActions(createNActionObjects({
          playerId: pid,
          initiator: rule.id,
          n: diceRolls.numRequired,
        }));
      } else if (itemIds) {
        ctx.update_setPlayerActions<PromptAction>([{
          id: createId(),
          playerId: pid,
          initiator: rule.id,
          type: ActionType.promptSelectCustom,
          candidateIds: itemIds,
        }]);
      }
    });

  },
  postActionExecute: () => {
    const { diceRolls, itemIds } = rule;
    const { arePromptActionsCompleted, allActions } = ctx;
    const ruleActions = allActions.filter(a => (a as PromptAction).initiator === rule.id);

    if (ctx.arePromptActionsCompleted) {
      if (diceRolls) {
        // Noop
      } else if (itemIds) {
        ruleActions.forEach(a => {
          const player = ctx.nextGame.players[a.playerId]!;
          const newItemIds = [...player.effects.itemIds];
          newItemIds.push(String(a.result));

          ctx.update_setPlayerEffectsPartial(player.id, {
            itemIds: newItemIds
          });
        });
      }

      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: RuleType.GroupActionRule,
});