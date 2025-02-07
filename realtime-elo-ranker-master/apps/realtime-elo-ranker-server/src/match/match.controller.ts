import { Body, Controller, Post } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly matchService: MatchService,
  ) {}

  @Post()
  async publishMatchResult(@Body() matchResult: { winner: string, loser: string, draw: boolean }) {
    const { winner, loser, draw } = matchResult;

    // Vérification d'un match nul
    if (draw) {
      return {
        ok: true,
        code: 200,
        message: 'Match nul',
      };
    }

    // Vérification des joueurs
    if (!winner || !loser) {
      return {
        ok: false,
        code: 400,
        message: 'Il manque un joueur',
      };
    }

    // Récupérer les joueurs par ID
    const winnerPlayer = await this.playerService.getPlayer(winner);
    const loserPlayer = await this.playerService.getPlayer(loser);

    // Vérifier si les joueurs existent
    if (!winnerPlayer || !loserPlayer) {
      return {
        ok: false,
        code: 400,
        message: 'Un des joueurs n\'existe pas',
      };
    }

    // Calcul du classement Elo
    const K = 32;
    const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserPlayer.elo - winnerPlayer.elo) / 400));
    const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerPlayer.elo - loserPlayer.elo) / 400));

    winnerPlayer.elo += K * (1 - expectedScoreWinner);
    loserPlayer.elo += K * (0 - expectedScoreLoser);

    winnerPlayer.elo = Math.round(winnerPlayer.elo);
    loserPlayer.elo = Math.round(loserPlayer.elo);

    // Mettre à jour les joueurs dans la base de données
    await this.playerService.updatePlayerRank(winnerPlayer.id, winnerPlayer.elo);
    await this.playerService.updatePlayerRank(loserPlayer.id, loserPlayer.elo);

    // Ajouter le match à l'historique
    await this.matchService.addMatch(winnerPlayer.id, loserPlayer.id, draw);

    // Retourner les résultats
    return {
      ok: true,
      code: 200,
      winner: {
        id: winnerPlayer.id,
        rank: winnerPlayer.rank,
      },
      loser: {
        id: loserPlayer.id,
        rank: loserPlayer.rank,
      },
    };
  }
}
