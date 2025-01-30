"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(elo) {
        this.id = Player.nextId++;
        this.elo = elo !== undefined ? elo : Player.calculateInitialElo();
        Player.players.push(this);
    }
    static calculateInitialElo() {
        if (Player.players.length === 0) {
            return 400;
        }
        const totalElo = Player.players.reduce((sum, player) => sum + player.elo, 0);
        return totalElo / Player.players.length;
    }
    updateElo(newElo) {
        this.elo = newElo;
    }
    static getAllPlayers() {
        return Player.players;
    }
}
exports.Player = Player;
Player.players = [];
Player.nextId = 1;
//# sourceMappingURL=player.entity.js.map