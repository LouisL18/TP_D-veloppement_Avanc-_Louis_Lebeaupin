import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from '../player/player.entity';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getRanking(): Player[] {
    return this.rankingService.getRanking();
  }

  @Get(':id')
  getPlayerRanking(@Param('id') id: number): number {
    return this.rankingService.getPlayerRanking(id);
  }
}