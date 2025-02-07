import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Player])],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}