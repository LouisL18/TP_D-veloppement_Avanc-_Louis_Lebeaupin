import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  // Récupérer tous les matchs
  async getMatches(): Promise<Match[]> {
    return this.matchRepository.find({ relations: ['winner', 'loser'] });  // Utilisez 'winner' et 'loser'
  }

  // Récupérer l'historique des matchs d'un joueur
  async getPlayerMatches(playerId: string): Promise<Match[]> {
    return this.matchRepository.createQueryBuilder('match')
      .leftJoinAndSelect('match.winner', 'winner')  // Join avec 'winner' et 'loser'
      .leftJoinAndSelect('match.loser', 'loser')
      .where('winner.id = :playerId OR loser.id = :playerId', { playerId })
      .getMany();
  }

  // Ajouter un match à l'historique
  async addMatch(winnerId: string, loserId: string, draw: boolean): Promise<Match> {
    const winner = await this.playerRepository.findOneBy({ id: winnerId });
    const loser = await this.playerRepository.findOneBy({ id: loserId });

    if (!winner || !loser) {
      throw new Error('One or both players not found');
    }

    const match = this.matchRepository.create({
      winner: draw ? null : winner,
      loser: draw ? null : loser,
      draw,
      date: new Date(),
    });

    return this.matchRepository.save(match);
  }

  // Créer un match avec vérification des doublons
  async createMatch(
    winnerId: string,
    loserId: string,
    draw: boolean
  ): Promise<Match> {
    const winner = await this.playerRepository.findOneBy({ id: winnerId });
    const loser = await this.playerRepository.findOneBy({ id: loserId });

    if (!winner || !loser) {
      throw new Error('One or both players not found');
    }

    // Vérification si un match existe déjà aujourd'hui entre ces joueurs
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingMatch = await this.matchRepository
      .createQueryBuilder('match')
      .where(
        '(match.winner = :winnerId AND match.loser = :loserId) OR (match.winner = :loserId AND match.loser = :winnerId)',
        { winnerId, loserId }
      )
      .andWhere('match.date >= :today', { today })
      .getOne();

    if (existingMatch) {
      throw new Error('A match between these players already exists today');
    }

    // Création du match
    const match = this.matchRepository.create({
      winner: draw ? null : winner,
      loser: draw ? null : loser,
      draw,
      date: new Date(),
    });

    // Mise à jour du classement Elo uniquement si ce n'est pas un match nul
    if (!draw) {
      const K = 32;
      const expectedScoreWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
      const expectedScoreLoser = 1 / (1 + Math.pow(10, (winner.elo - loser.elo) / 400));
      
      winner.elo += K * (1 - expectedScoreWinner);
      loser.elo += K * (0 - expectedScoreLoser);
      
      winner.elo = Math.round(winner.elo);
      loser.elo = Math.round(loser.elo);

      await this.playerRepository.save([winner, loser]);
    }

    return this.matchRepository.save(match);
  }

  // Supprimer un match et recalculer le classement Elo
  async deleteMatch(matchId: number): Promise<void> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: ['winner', 'loser'],  // Corrigé : relations avec 'winner' et 'loser'
    });

    if (!match) {
      throw new Error('Match not found');
    }

    // Recalculer les classements Elo en annulant le match
    if (match.winner && match.loser) {
      const K = 32;
      const expectedScoreWinner = 1 / (1 + Math.pow(10, (match.loser.elo - match.winner.elo) / 400));  // Elo doit être calculé avec 'elo'
      const expectedScoreLoser = 1 / (1 + Math.pow(10, (match.winner.elo - match.loser.elo) / 400));

      match.winner.elo -= K * (1 - expectedScoreWinner);
      match.loser.elo -= K * (0 - expectedScoreLoser);

      match.winner.elo = Math.round(match.winner.elo);
      match.loser.elo = Math.round(match.loser.elo);

      await this.playerRepository.save([match.winner, match.loser]);
    }

    // Supprimer le match de la base de données
    await this.matchRepository.delete(matchId);
  }
}
