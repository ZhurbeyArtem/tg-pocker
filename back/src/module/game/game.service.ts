import { Injectable } from '@nestjs/common';
import { Game } from './interfaces/game.interface';
import { Player } from './interfaces/player.interface';

@Injectable()
export class GameService {
  private games: Game[] = [];

  createGame(): Game {
    const game: Game = {
      id: this.generateId(),
      players: [],
      deck: this.shuffleDeck(this.createDeck()),
      pot: 0,
      communityCards: [],
    };
    this.games.push(game);
    return game;
  }

  getGame(gameId: string): Game {
    return this.games.find((game) => game.id === gameId);
  }

  joinGame({ gameId, playerId }): Player {
    const game = this.games.find((game) => game.id === gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    const player: Player = {
      id: playerId.playerId,
      balance: 1500,
      cards: [],
    };

    game.players.push(player);
    return player;
  }

  dealCards(gameId: string) {
    const game = this.games.find((game) => game.id === gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    game.players.forEach((player) => {
      player.cards = [game.deck.pop(), game.deck.pop()];
    });
    return game
  }

  private createDeck(): string[] {
    const suits = ['H', 'D', 'C', 'S'];
    const values = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'T',
      'J',
      'Q',
      'K',
      'A',
    ];
    const deck = [];
    for (const suit of suits) {
      for (const value of values) {
        deck.push(value + suit);
      }
    }
    return deck;
  }

  private shuffleDeck(deck: string[]): string[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
