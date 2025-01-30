import { MatchService } from './match.service';
import { Match } from './match.entity';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    createMatch(player1Id: number, player2Id: number, result: 'win' | 'lose' | 'draw'): Match;
}
