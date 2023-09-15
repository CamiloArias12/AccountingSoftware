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
exports.TypeSavingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const type_saving_service_1 = require("./type-saving.service");
const type_saving_entity_1 = require("./type-saving.entity");
const createTypeSaving_dto_1 = require("./dto/createTypeSaving.dto");
const updateTypeSaving_dto_1 = require("./dto/updateTypeSaving.dto");
let TypeSavingResolver = class TypeSavingResolver {
    constructor(typeSavingService) {
        this.typeSavingService = typeSavingService;
    }
    async createTypeSaving(input) {
        return await this.typeSavingService.create(input);
    }
    async allTypeSavings() {
        return await this.typeSavingService.findAll();
    }
    async typeSaving(id) {
        return await this.typeSavingService.findOne(id);
    }
    async updateTypeSaving(id, input) {
        return await this.typeSavingService.update(id, input);
    }
    async deleteTypeSaving(id) {
        await this.typeSavingService.remove(id);
        return true;
    }
};
exports.TypeSavingResolver = TypeSavingResolver;
__decorate([
    (0, graphql_1.Mutation)(() => type_saving_entity_1.TypeSaving),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTypeSaving_dto_1.CreateTypeSavingDto]),
    __metadata("design:returntype", Promise)
], TypeSavingResolver.prototype, "createTypeSaving", null);
__decorate([
    (0, graphql_1.Query)(() => [type_saving_entity_1.TypeSaving]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeSavingResolver.prototype, "allTypeSavings", null);
__decorate([
    (0, graphql_1.Query)(() => type_saving_entity_1.TypeSaving),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeSavingResolver.prototype, "typeSaving", null);
__decorate([
    (0, graphql_1.Mutation)(() => type_saving_entity_1.TypeSaving),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateTypeSaving_dto_1.UpdateTypeSavingDto]),
    __metadata("design:returntype", Promise)
], TypeSavingResolver.prototype, "updateTypeSaving", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeSavingResolver.prototype, "deleteTypeSaving", null);
exports.TypeSavingResolver = TypeSavingResolver = __decorate([
    (0, graphql_1.Resolver)(() => type_saving_entity_1.TypeSaving),
    __metadata("design:paramtypes", [type_saving_service_1.TypeSavingService])
], TypeSavingResolver);
//# sourceMappingURL=type-saving.resolver.js.map