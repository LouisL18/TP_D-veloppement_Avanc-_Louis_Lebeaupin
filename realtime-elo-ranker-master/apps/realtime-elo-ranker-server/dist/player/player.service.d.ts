import { Player } from './player.entity';
export declare class PlayerService {
    createPlayer(elo?: number): Player;
    getAllPlayers(): Player[];
    updatePlayerElo(id: number, newElo: number): Player;
}
