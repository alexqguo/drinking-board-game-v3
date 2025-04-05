import { ActionType, requestHandler } from '@repo/engine';
import { logger } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';

export const gameRequest = onRequest(async (req, res) => {
  const { action: actionParam, actionArgs: actionArgsParam } = req.query;

  const action = String(actionParam) as ActionType;
  const actionArgs = JSON.parse(actionArgsParam as string ?? '{}');

  try {
    logger.info(`Invoking engine with args: ${JSON.stringify(req.query)}`);
    const result = requestHandler({
      action,
      actionArgs,
      prevGame: null,
      loggers: {
        display: logger.debug,
        debug: logger.debug,
        error: logger.error,
      }
    });

    res.json({
      success: true,
      result
    });
  } catch (e) {
    logger.error(e);
    res.json({
      success: false,
      error: JSON.stringify(e)
    });
  }
});