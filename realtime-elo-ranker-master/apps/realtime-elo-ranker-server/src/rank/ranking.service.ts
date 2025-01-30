import { Injectable } from '@nestjs/common';
import { Player } from '../player/player.entity';

@Injectable()
export class RankingService {
  getRanking(): Player[] {
    return Player.getAllPlayers().sort((a, b) => b.elo - a.elo);
  }

  getPlayerRanking(playerId: number): number {
    const ranking = this.getRanking();
    const playerIndex = ranking.findIndex(player => player.id === playerId);
    return playerIndex !== -1 ? playerIndex + 1 : -1;
  }
}