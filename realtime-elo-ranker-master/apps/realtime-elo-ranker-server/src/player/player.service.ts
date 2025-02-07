import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  // Créer un joueur
  async createPlayer(id: string, elo: number = 1000): Promise<Player> {
    if (!id) {
      throw new Error("Player name cannot be empty");
    }
    const player = this.playerRepository.create({ id, elo });
    return this.playerRepository.save(player);
  }

  // Récupérer tous les joueurs
  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  // Récupérer un joueur par ID
  async getPlayer(id: string): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  // Mettre à jour le classement d'un joueur
  async updatePlayerRank(id: string, newRank: number): Promise<Player> {
    const player = await this.getPlayer(id);
    player.rank = newRank;
    return this.playerRepository.save(player);
  }

  // Supprimer un joueur
  async deletePlayer(id: number): Promise<void> {
    const result = await this.playerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }
}