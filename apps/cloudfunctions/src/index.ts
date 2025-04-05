// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
export const addMessage = onRequest(async (req, res) => {
  logger.info('Hello world');
  // Send back a message that we've successfully written the message
  res.json({result: `Query: ${JSON.stringify(req.query)}`});
});