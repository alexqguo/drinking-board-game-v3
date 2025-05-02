import { ActionType } from '@repo/enums';
import { RuleType } from '@repo/schemas';
import { PromptAction } from '../actions/actions.types.js';
import { createId } from '../utils/ids.js';
import { ChallengeRule } from '@repo/schemas';
import { RuleHandlerFactory } from './rules.types.js';

// Alas, the quick shitty hack from v1 and v2 remains. Should be a part of ChoiceRule in the future
export const handler: RuleHandlerFactory<ChallengeRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerActions<PromptAction>(
      [
        {
          id: createId(),
          playerId: ctx.currentPlayer.id,
          type: ActionType.promptSelectPlayer,
          candidateIds: ctx.otherPlayerIds,
          initiator: rule.id,
        },
      ],
      'promptActions',
    );
  },
  postActionExecute: () => {
    const { nextGame, currentPlayer, arePromptActionsCompleted: isDone, allActions } = ctx;
    const promptActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);
    const candidatePlayerIds = [currentPlayer.id, String(promptActions[0]?.result)];

    if (isDone && promptActions.length === 1) {
      ctx.update_setGamePromptPartial({
        messageOverride: {
          stringId: 'engine_challengePrompt',
        },
      });

      ctx.update_setPlayerActions<PromptAction>(
        [
          {
            id: createId(),
            playerId: currentPlayer.id,
            type: ActionType.promptSelectPlayer,
            candidateIds: candidatePlayerIds,
            initiator: rule.id,
          },
        ],
        'promptActions',
      );
    } else if (isDone) {
      const winningPlayerId = String(promptActions[1]?.result);
      const losingPlayerId = candidatePlayerIds.find((id: string) => id !== winningPlayerId)!;
      const winner = nextGame.players[winningPlayerId];
      const loser = nextGame.players[losingPlayerId];

      if (winner) {
        ctx.update_setPlayerEffectsPartial(winningPlayerId, {
          extraTurns: winner.effects.extraTurns + 1,
        });
      }

      if (loser) {
        ctx.update_setPlayerEffectsPartial(losingPlayerId, {
          skippedTurns: {
            numTurns: loser.effects.skippedTurns.numTurns + 1,
            message: {
              stringId: 'engine_lostTurns',
            },
          },
        });
      }

      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: RuleType.ChallengeRule,
});
