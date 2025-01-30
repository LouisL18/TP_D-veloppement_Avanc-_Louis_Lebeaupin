import { RankingService } from './ranking.service';
import { Player } from '../player/player.entity';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRanking(): Player[];
    getPlayerRanking(id: number): number;
}
