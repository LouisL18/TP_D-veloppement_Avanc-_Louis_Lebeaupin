import { PlayerService } from './player.service';
import { Player } from './player.entity';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    createPlayer(elo?: number): Player;
    getAllPlayers(): Player[];
    updatePlayerElo(id: number, newElo: number): Player;
}
