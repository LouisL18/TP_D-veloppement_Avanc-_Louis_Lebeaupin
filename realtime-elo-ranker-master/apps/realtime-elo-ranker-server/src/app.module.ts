import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { RankingModule } from './rank/ranking.module';

@Module({
  imports: [PlayerModule, MatchModule, RankingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
