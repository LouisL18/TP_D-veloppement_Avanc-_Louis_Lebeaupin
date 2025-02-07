import { Player } from '../player/player.entity';
export declare class Match {
    id: number;
    winner: Player | null;
    loser: Player | null;
    draw: boolean;
    date: Date;
}
