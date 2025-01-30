import { Player } from '../player/player.entity';

export class Match {
  public player1: Player;
  public player2: Player;
  public result: 'win' | 'lose' | 'draw';

  constructor(player1: Player, player2: Player, result: 'win' | 'lose' | 'draw') {
    this.player1 = player1;
    this.player2 = player2;
    this.result = result;
    this.updateElo();
  }

  private updateElo(): void {
    const K = 32;

    const expectedScore1 = 1 / (1 + Math.pow(10, (this.player2.elo - this.player1.elo) / 400));
    const expectedScore2 = 1 / (1 + Math.pow(10, (this.player1.elo - this.player2.elo) / 400));

    let score1, score2;
    if (this.result === 'win') {
      score1 = 1;
      score2 = 0;
    } else if (this.result === 'lose') {
      score1 = 0;
      score2 = 1;
    } else {
      score1 = 0.5;
      score2 = 0.5;
    }

    this.player1.updateElo(this.player1.elo + K * (score1 - expectedScore1));
    this.player2.updateElo(this.player2.elo + K * (score2 - expectedScore2));
  }
}