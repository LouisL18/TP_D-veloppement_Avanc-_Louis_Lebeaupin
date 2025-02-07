import { Injectable } from '@nestjs/common';
import { Player } from '../player/player.entity';
import { PlayerService } from '../player/player.service';

@Injectable()
export class RankingService {
  constructor(private readonly playerService: PlayerService) {}

  async getRanking(): Promise<Player[]> {
    const players = await this.playerService.getAllPlayers();
    return players.sort((a, b) => b.elo - a.elo);
  }

  async getPlayerRanking(playerId: string): Promise<string> {
    const ranking = await this.getRanking();
    const player = ranking.find(player => player.id === playerId);
    if (!player) {
      return 'Player not found';
    }
    const index = ranking.indexOf(player);
    return `Player ${player.id} is ranked ${index + 1} with ${player.elo} points`;
    
  }
}