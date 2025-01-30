export class Player {
    private static players: Player[] = [];
    private static nextId = 1;
  
    public id: number;
    public elo: number;
  
    constructor(elo?: number) {
      this.id = Player.nextId++;
      this.elo = elo !== undefined ? elo : Player.calculateInitialElo();
      Player.players.push(this);
    }
  
    private static calculateInitialElo(): number {
      if (Player.players.length === 0) {
        return 400;
      }
      const totalElo = Player.players.reduce((sum, player) => sum + player.elo, 0);
      return totalElo / Player.players.length;
    }
  
    public updateElo(newElo: number): void {
      this.elo = newElo;
    }
  
    public static getAllPlayers(): Player[] {
      return Player.players;
    }
  }