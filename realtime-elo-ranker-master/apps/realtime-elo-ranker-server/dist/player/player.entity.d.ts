export declare class Player {
    private static players;
    private static nextId;
    id: number;
    elo: number;
    constructor(elo?: number);
    private static calculateInitialElo;
    updateElo(newElo: number): void;
    static getAllPlayers(): Player[];
}
