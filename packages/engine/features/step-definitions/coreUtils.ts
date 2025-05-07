import { Given as CGiven, Then as CThen, When as CWhen, World } from '@cucumber/cucumber';
import { BoardModule } from '@repo/schemas';
import { Game, Player } from '../../src/gamestate';

export interface CustomWorld extends World {
  game: Game;
  gameSavedForComparison: Game | null;
  playerNames: string[];
  board: string;

  getBoard: () => BoardModule;
  getCurrentPlayer: () => Player;
  getPlayerForName: (name: string) => Player;
}

export const Then = CThen<CustomWorld>;
export const When = CWhen<CustomWorld>;
export const Given = CGiven<CustomWorld>;
