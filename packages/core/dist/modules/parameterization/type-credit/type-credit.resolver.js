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
exports.TypeCreditResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const type_credit_service_1 = require("./type-credit.service");
const type_credit_entity_1 = require("./type-credit.entity");
const createTypeCredit_dto_1 = require("./dto/createTypeCredit.dto");
const updateTypeCredit_dto_1 = require("./dto/updateTypeCredit.dto");
let TypeCreditResolver = class TypeCreditResolver {
    constructor(typeCreditService) {
        this.typeCreditService = typeCreditService;
    }
    async createTypeCredit(input) {
        return await this.typeCreditService.create(input);
    }
    async allTypeCredits() {
        return await this.typeCreditService.findAll();
    }
    async typeCredit(id) {
        return await this.typeCreditService.findOne(id);
    }
    async updateTypeCredit(id, input) {
        return await this.typeCreditService.update(id, input);
    }
    async deleteTypeCredit(id) {
        await this.typeCreditService.remove(id);
        return true;
    }
};
exports.TypeCreditResolver = TypeCreditResolver;
__decorate([
    (0, graphql_1.Mutation)(() => type_credit_entity_1.TypeCredit),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTypeCredit_dto_1.CreateTypeCreditDto]),
    __metadata("design:returntype", Promise)
], TypeCreditResolver.prototype, "createTypeCredit", null);
__decorate([
    (0, graphql_1.Query)(() => [type_credit_entity_1.TypeCredit]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeCreditResolver.prototype, "allTypeCredits", null);
__decorate([
    (0, graphql_1.Query)(() => type_credit_entity_1.TypeCredit),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeCreditResolver.prototype, "typeCredit", null);
__decorate([
    (0, graphql_1.Mutation)(() => type_credit_entity_1.TypeCredit),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateTypeCredit_dto_1.UpdateTypeCreditDto]),
    __metadata("design:returntype", Promise)
], TypeCreditResolver.prototype, "updateTypeCredit", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeCreditResolver.prototype, "deleteTypeCredit", null);
exports.TypeCreditResolver = TypeCreditResolver = __decorate([
    (0, graphql_1.Resolver)(() => type_credit_entity_1.TypeCredit),
    __metadata("design:paramtypes", [type_credit_service_1.TypeCreditService])
], TypeCreditResolver);
//# sourceMappingURL=type-credit.resolver.js.map