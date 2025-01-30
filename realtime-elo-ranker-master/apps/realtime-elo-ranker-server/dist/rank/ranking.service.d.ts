import { Player } from '../player/player.entity';
export declare class RankingService {
    getRanking(): Player[];
    getPlayerRanking(playerId: number): number;
}
