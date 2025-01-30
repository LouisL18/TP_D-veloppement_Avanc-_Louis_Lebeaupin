import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  createPlayer(@Body('elo') elo?: number): Player {
    return this.playerService.createPlayer(elo);
  }

  @Get()
  getAllPlayers(): Player[] {
    return this.playerService.getAllPlayers();
  }

  @Put(':id/elo')
  updatePlayerElo(@Param('id') id: number, @Body('elo') newElo: number): Player {
    return this.playerService.updatePlayerElo(id, newElo);
  }
}