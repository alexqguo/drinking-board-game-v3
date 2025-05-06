import { Given as CGiven, Then as CThen, When as CWhen, World } from '@cucumber/cucumber';
import { Game, Player } from '../../src/gamestate';

export interface CustomWorld extends World {
  game: Game;
  playerNames: string[];
  board: string;

  getCurrentPlayer: () => Player;
  getPlayerForName: (name: string) => Player;
}

export const Then = CThen<CustomWorld>;
export const When = CWhen<CustomWorld>;
export const Given = CGiven<CustomWorld>;
