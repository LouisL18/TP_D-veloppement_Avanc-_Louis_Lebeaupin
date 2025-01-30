import { Player } from '../player/player.entity';
import { Match } from './match.entity';
export declare class MatchService {
    createMatch(player1: Player, player2: Player, result: 'win' | 'lose' | 'draw'): Match;
}
