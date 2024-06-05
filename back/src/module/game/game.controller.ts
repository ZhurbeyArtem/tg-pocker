import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './interfaces/game.interface';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Post('create')
  createGame(): Game {
    return this.gameService.createGame();
  }

  @Post(':gameId/join')
  joinGame(@Param('gameId') gameId: string, @Query() playerId: string): any {
    try {
      return this.gameService.joinGame({ gameId, playerId });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post(':gameId/deal')
  dealCards(@Param('gameId') gameId: string) {
    try {
      return this.gameService.dealCards(gameId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':gameId')
  getGame(@Param('gameId') gameId: string): any {
    return this.gameService.getGame(gameId);
  }
}
