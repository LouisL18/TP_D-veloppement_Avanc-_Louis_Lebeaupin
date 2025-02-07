import { Repository } from 'typeorm';
import { Player } from './player.entity';
export declare class PlayerService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    createPlayer(id: string, elo?: number): Promise<Player>;
    getAllPlayers(): Promise<Player[]>;
    getPlayer(id: string): Promise<Player>;
    updatePlayerRank(id: string, newRank: number): Promise<Player>;
    deletePlayer(id: number): Promise<void>;
}
