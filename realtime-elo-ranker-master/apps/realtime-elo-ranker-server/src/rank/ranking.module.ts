import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PlayerModule } from '../player/player.module';

@Module({
  providers: [RankingService],
  controllers: [RankingController],
  imports: [PlayerModule],
})
export class RankingModule {}