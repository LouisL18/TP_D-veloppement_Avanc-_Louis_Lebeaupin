import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  createPlayer(elo?: number): Player {
    return new Player(elo);
  }

  getAllPlayers(): Player[] {
    return Player.getAllPlayers();
  }

  updatePlayerElo(id: number, newElo: number): Player {
    const player = Player.getAllPlayers().find(player => player.id === id);
    if (player) {
      player.updateElo(newElo);
    }
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player;
  }
}