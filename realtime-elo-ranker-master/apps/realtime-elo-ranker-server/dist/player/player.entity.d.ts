import { Match } from '../match/match.entity';
export declare class Player {
    id: string;
    elo: number;
    rank: number;
    wins: Match[];
    losses: Match[];
}
