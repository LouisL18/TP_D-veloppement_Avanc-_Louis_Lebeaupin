import { Player } from 'src/player/player.entity';
export declare class RankingEvent {
    id: string;
    type: string;
    player: Player;
    rank: number;
}
