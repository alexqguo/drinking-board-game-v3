import { When } from './coreUtils';

When('{string} has the item {string}', function (playerName, item) {
  this.getPlayerForName(playerName).effects.itemIds.push(item);
});
