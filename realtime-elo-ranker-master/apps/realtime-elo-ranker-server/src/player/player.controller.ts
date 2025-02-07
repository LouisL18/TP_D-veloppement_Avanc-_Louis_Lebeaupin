
import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body('id') id: string): Promise<Player> {
    return this.playerService.createPlayer(id);
  }
}