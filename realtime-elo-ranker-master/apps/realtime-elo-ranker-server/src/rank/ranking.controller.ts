import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from '../player/player.entity';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking(): Promise<Player[]> {
    return this.rankingService.getRanking();
  }

  @Get(':id')
  async getPlayerRanking(@Param('id') id: string): Promise<string> {
    return this.rankingService.getPlayerRanking(id);
  }
}