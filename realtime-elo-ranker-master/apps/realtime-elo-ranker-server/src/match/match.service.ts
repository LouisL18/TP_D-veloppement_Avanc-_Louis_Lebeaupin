import { Injectable } from '@nestjs/common';
import { Player } from '../player/player.entity';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  createMatch(player1: Player, player2: Player, result: 'win' | 'lose' | 'draw'): Match {
    return new Match(player1, player2, result);
  }
}