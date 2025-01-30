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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const player_entity_1 = require("../player/player.entity");
const match_entity_1 = require("./match.entity");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    createMatch(player1Id, player2Id, result) {
        const player1 = player_entity_1.Player.getAllPlayers().find(player => player.id === player1Id);
        const player2 = player_entity_1.Player.getAllPlayers().find(player => player.id === player2Id);
        if (!player1 || !player2) {
            throw new Error('Player not found');
        }
        return this.matchService.createMatch(player1, player2, result);
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('player1Id')),
    __param(1, (0, common_1.Body)('player2Id')),
    __param(2, (0, common_1.Body)('result')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", match_entity_1.Match)
], MatchController.prototype, "createMatch", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('api/match'),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map