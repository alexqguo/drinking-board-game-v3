import { ActionType } from '../actions/actions.types.js';
import { createId } from '../utils/ids.js';
import { AcquireItemRule, PlayerTarget, RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<AcquireItemRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    // Note - custom playerTarget is not supported for this rule type
    const { itemIds, playerTarget } = rule;
    const { currentPlayer, nextGame, allPlayerIds, otherPlayerIds } = ctx;
    const hasMultipleItems = itemIds.length > 1;

    let playerIds: string[] = [];
    if (playerTarget === PlayerTarget.all) playerIds = allPlayerIds;
    if (playerTarget === PlayerTarget.allOthers) playerIds = otherPlayerIds;
    if (playerTarget === PlayerTarget.self) playerIds = [currentPlayer.id];

    if (hasMultipleItems) {
      // Requires a choice from players
      playerIds.forEach(pid => {
        ctx.update_setPlayerActions(
          pid,
          [{
            id: createId(),
            type: ActionType.promptSelectCustom,
            candidateIds: itemIds,
          }],
        );
      });
    } else if (itemIds.length) {
      playerIds.forEach(pid => {
        const playerExistingItems = nextGame.players[pid]?.effects.itemIds || [];
        // TODO- for starters, it clears out the previous one not adds on
        ctx.update_setPlayerEffectsPartial(pid, {
          itemIds: [...playerExistingItems, itemIds[0]!],
        });
      });
    }
  },
  postActionExecute: () => {
    if (ctx.arePromptActionsCompleted) {
      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: 'AcquireItemRule',
});