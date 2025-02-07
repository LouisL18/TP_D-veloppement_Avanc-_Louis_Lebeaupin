import { Player } from '../player/player.entity';
import { PlayerService } from '../player/player.service';
export declare class RankingService {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getRanking(): Promise<Player[]>;
    getPlayerRanking(playerId: string): Promise<string>;
}
