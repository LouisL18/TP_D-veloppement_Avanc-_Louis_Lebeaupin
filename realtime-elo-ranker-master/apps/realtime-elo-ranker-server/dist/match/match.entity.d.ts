import { Player } from '../player/player.entity';
export declare class Match {
    player1: Player;
    player2: Player;
    result: 'win' | 'lose' | 'draw';
    constructor(player1: Player, player2: Player, result: 'win' | 'lose' | 'draw');
    private updateElo;
}
