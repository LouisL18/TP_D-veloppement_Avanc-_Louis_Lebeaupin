"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("./match.entity");
const player_entity_1 = require("../player/player.entity");
let MatchService = class MatchService {
    constructor(matchRepository, playerRepository) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
    }
    async getMatches() {
        return this.matchRepository.find({ relations: ['winner', 'loser'] });
    }
    async getPlayerMatches(playerId) {
        return this.matchRepository.createQueryBuilder('match')
            .leftJoinAndSelect('match.winner', 'winner')
            .leftJoinAndSelect('match.loser', 'loser')
            .where('winner.id = :playerId OR loser.id = :playerId', { playerId })
            .getMany();
    }
    async addMatch(winnerId, loserId, draw) {
        const winner = await this.playerRepository.findOneBy({ id: winnerId });
        const loser = await this.playerRepository.findOneBy({ id: loserId });
        if (!winner || !loser) {
            throw new Error('One or both players not found');
        }
        const match = this.matchRepository.create({
            winner: draw ? null : winner,
            loser: draw ? null : loser,
            draw,
            date: new Date(),
        });
        return this.matchRepository.save(match);
    }
    async createMatch(winnerId, loserId, draw) {
        const winner = await this.playerRepository.findOneBy({ id: winnerId });
        const loser = await this.playerRepository.findOneBy({ id: loserId });
        if (!winner || !loser) {
            throw new Error('One or both players not found');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existingMatch = await this.matchRepository
            .createQueryBuilder('match')
            .where('(match.winner = :winnerId AND match.loser = :loserId) OR (match.winner = :loserId AND match.loser = :winnerId)', { winnerId, loserId })
            .andWhere('match.date >= :today', { today })
            .getOne();
        if (existingMatch) {
            throw new Error('A match between these players already exists today');
        }
        const match = this.matchRepository.create({
            winner: draw ? null : winner,
            loser: draw ? null : loser,
            draw,
            date: new Date(),
        });
        if (!draw) {
            const K = 32;
            const expectedScoreWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
            const expectedScoreLoser = 1 / (1 + Math.pow(10, (winner.elo - loser.elo) / 400));
            winner.elo += K * (1 - expectedScoreWinner);
            loser.elo += K * (0 - expectedScoreLoser);
            winner.elo = Math.round(winner.elo);
            loser.elo = Math.round(loser.elo);
            await this.playerRepository.save([winner, loser]);
        }
        return this.matchRepository.save(match);
    }
    async deleteMatch(matchId) {
        const match = await this.matchRepository.findOne({
            where: { id: matchId },
            relations: ['winner', 'loser'],
        });
        if (!match) {
            throw new Error('Match not found');
        }
        if (match.winner && match.loser) {
            const K = 32;
            const expectedScoreWinner = 1 / (1 + Math.pow(10, (match.loser.elo - match.winner.elo) / 400));
            const expectedScoreLoser = 1 / (1 + Math.pow(10, (match.winner.elo - match.loser.elo) / 400));
            match.winner.elo -= K * (1 - expectedScoreWinner);
            match.loser.elo -= K * (0 - expectedScoreLoser);
            match.winner.elo = Math.round(match.winner.elo);
            match.loser.elo = Math.round(match.loser.elo);
            await this.playerRepository.save([match.winner, match.loser]);
        }
        await this.matchRepository.delete(matchId);
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MatchService);
//# sourceMappingURL=match.service.js.map