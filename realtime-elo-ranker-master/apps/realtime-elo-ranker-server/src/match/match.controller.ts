import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { Player } from '../player/player.entity';
import { Match } from './match.entity';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  createMatch(
    @Body('player1Id') player1Id: number,
    @Body('player2Id') player2Id: number,
    @Body('result') result: 'win' | 'lose' | 'draw'
  ): Match {
    const player1 = Player.getAllPlayers().find(player => player.id === player1Id);
    const player2 = Player.getAllPlayers().find(player => player.id === player2Id);

    if (!player1 || !player2) {
      throw new Error('Player not found');
    }

    return this.matchService.createMatch(player1, player2, result);
  }
}