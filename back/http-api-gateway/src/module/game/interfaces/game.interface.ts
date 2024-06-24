import { Player } from './player.interface';

export interface Game {
  id: string;
  players: Player[];
  deck: string[];
  pot: number;
  communityCards: string[];
}
