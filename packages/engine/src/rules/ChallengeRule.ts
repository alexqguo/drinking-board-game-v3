import { ActionType } from '../enums.js';
import { RuleHandlerFactory } from './types.js';

// Alas, the quick shitty hack from v1 and v2 remains. Should be a part of ChoiceRule in the future
export const ChallengeRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerActions<PromptAction>(
      ctx.currentPlayer.id,
      [{
        actionType: ActionType.promptSelectPlayer,
        candidateIds: ctx.otherPlayerIds,
      }],
      'add',
      'promptActions'
    );
  },
  postActionExecute: () => {
    const {
      nextGame,
      currentPlayer,
      arePromptActionsCompleted: isDone,
      allPromptActions
    } = ctx;
    const candidatePlayerIds = [currentPlayer.id, allPromptActions[0]?.actionResult];

    if (isDone && allPromptActions.length === 1) {
      ctx.update_setGamePromptPartial({
        messageOverride: '[todo- i18n] who won?',
      });

      ctx.update_setPlayerActions<PromptAction>(
        currentPlayer.id,
        [{
          actionType: ActionType.promptSelectPlayer,
          candidateIds: candidatePlayerIds,
        }],
        'add',
        'promptActions',
      );
    } else if (isDone) {
      const winningPlayerId = allPromptActions[1]?.actionResult;
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
            message: '[todo-i18n] en.lostTurn.general'
          }
        });
      }

      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: 'ChallengeRule',
});