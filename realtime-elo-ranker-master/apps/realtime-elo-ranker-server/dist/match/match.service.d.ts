import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';
export declare class MatchService {
    private matchRepository;
    private playerRepository;
    constructor(matchRepository: Repository<Match>, playerRepository: Repository<Player>);
    getMatches(): Promise<Match[]>;
    getPlayerMatches(playerId: string): Promise<Match[]>;
    addMatch(winnerId: string, loserId: string, draw: boolean): Promise<Match>;
    createMatch(winnerId: string, loserId: string, draw: boolean): Promise<Match>;
    deleteMatch(matchId: number): Promise<void>;
}
