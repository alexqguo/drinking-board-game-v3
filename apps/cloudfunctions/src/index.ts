import { ActionType, requestHandler } from '@repo/engine';
import { logger } from 'firebase-functions';
import { onCall } from 'firebase-functions/v2/https';

export const gameRequest = onCall(
  { cors: ['https://*.alexguo.co', 'http://localhost:5173'] },
  async (req) => {
    const { action: actionParam, actionArgs: actionArgsParam } = req.data;

    const action = String(actionParam) as ActionType;

    try {
      logger.info(`Invoking engine with args: ${JSON.stringify(req.data)}`);
      const result = requestHandler({
        action,
        actionArgs: actionArgsParam,
        prevGame: null,
        loggers: {
          display: logger.debug,
          debug: logger.debug,
          error: logger.error,
        }
      });

      return({
        success: true,
        result
      });
    } catch (e) {
      logger.error(e);
      return({
        success: false,
        error: JSON.stringify(e)
      });
    }
});