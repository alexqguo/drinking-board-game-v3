import { ActionType, requestHandler } from '@repo/engine';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { logger } from 'firebase-functions';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

if (!getApps().length) {
  initializeApp();
}
// TODO - connect to local emulator instead when developing on local
const db = getDatabase();

/**
 * notes
 * - deployment script and weirdness, no monorepo support
 * - oncall vs onrequest
 * - invoker role in google cloud console (allUsers)
 */
export const gameRequest = onCall(
  { cors: ['https://*.alexguo.co', 'http://localhost:5173'] },
  async (req) => {
    try {
      if (!req.auth) {
        throw new HttpsError('unauthenticated', 'Not signed in');
      }

      const { action: actionParam, actionArgs: actionArgsParam } = req.data;
      const action = String(actionParam) as ActionType;
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

      await db.ref('game/1234').set(result);

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