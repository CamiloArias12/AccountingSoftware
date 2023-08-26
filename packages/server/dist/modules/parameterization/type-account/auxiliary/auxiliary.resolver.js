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
exports.AuxiliaryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auxiliary_service_1 = require("./auxiliary.service");
const auxiliary_entity_1 = require("./auxiliary.entity");
const createAuxiliary_dto_1 = require("./dto/createAuxiliary.dto");
const updateAuxiliary_dto_1 = require("./dto/updateAuxiliary.dto");
let AuxiliaryResolver = class AuxiliaryResolver {
    constructor(auxiliaryService) {
        this.auxiliaryService = auxiliaryService;
    }
    async createAuxiliary(input) {
        return await this.auxiliaryService.create(input);
    }
    async allAuxiliaries() {
        return await this.auxiliaryService.findAll();
    }
    async auxiliary(code) {
        return await this.auxiliaryService.findOne(code);
    }
    async updateAuxiliary(code, input) {
        return await this.auxiliaryService.update(code, input);
    }
    async deleteAuxiliary(code) {
        await this.auxiliaryService.remove(code);
        return true;
    }
};
exports.AuxiliaryResolver = AuxiliaryResolver;
__decorate([
    (0, graphql_1.Mutation)(() => auxiliary_entity_1.Auxiliary),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAuxiliary_dto_1.CreateAuxiliaryDto]),
    __metadata("design:returntype", Promise)
], AuxiliaryResolver.prototype, "createAuxiliary", null);
__decorate([
    (0, graphql_1.Query)(() => [auxiliary_entity_1.Auxiliary]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuxiliaryResolver.prototype, "allAuxiliaries", null);
__decorate([
    (0, graphql_1.Query)(() => auxiliary_entity_1.Auxiliary),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuxiliaryResolver.prototype, "auxiliary", null);
__decorate([
    (0, graphql_1.Mutation)(() => auxiliary_entity_1.Auxiliary),
    __param(0, (0, graphql_1.Args)('code')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAuxiliary_dto_1.UpdateAuxiliaryDto]),
    __metadata("design:returntype", Promise)
], AuxiliaryResolver.prototype, "updateAuxiliary", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuxiliaryResolver.prototype, "deleteAuxiliary", null);
exports.AuxiliaryResolver = AuxiliaryResolver = __decorate([
    (0, graphql_1.Resolver)(() => auxiliary_entity_1.Auxiliary),
    __metadata("design:paramtypes", [auxiliary_service_1.AuxiliaryService])
], AuxiliaryResolver);
//# sourceMappingURL=auxiliary.resolver.js.map