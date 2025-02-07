import { PlayerService } from '../player/player.service';
import { MatchService } from './match.service';
export declare class MatchController {
    private readonly playerService;
    private readonly matchService;
    constructor(playerService: PlayerService, matchService: MatchService);
    publishMatchResult(matchResult: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<{
        ok: boolean;
        code: number;
        message: string;
        winner?: undefined;
        loser?: undefined;
    } | {
        ok: boolean;
        code: number;
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
        message?: undefined;
    }>;
}
