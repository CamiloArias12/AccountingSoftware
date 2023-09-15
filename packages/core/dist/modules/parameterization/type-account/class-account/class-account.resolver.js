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
exports.ClassAccountResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_account_service_1 = require("./class-account.service");
const class_account_entity_1 = require("./class-account.entity");
const createClassAccount_dto_1 = require("./dto/createClassAccount.dto");
const updateClassAccount_dto_1 = require("./dto/updateClassAccount.dto");
let ClassAccountResolver = class ClassAccountResolver {
    constructor(classAccountService) {
        this.classAccountService = classAccountService;
    }
    async createClassAccount(input) {
        return await this.classAccountService.create(input);
    }
    async allClassAccounts() {
        return await this.classAccountService.findAll();
    }
    async classAccount(code) {
        return await this.classAccountService.findOne(code);
    }
    async updateClassAccount(code, input) {
        return await this.classAccountService.update(code, input);
    }
    async deleteClassAccount(code) {
        await this.classAccountService.remove(code);
        return true;
    }
};
exports.ClassAccountResolver = ClassAccountResolver;
__decorate([
    (0, graphql_1.Mutation)(() => class_account_entity_1.ClassAccount),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createClassAccount_dto_1.CreateClassAccountDto]),
    __metadata("design:returntype", Promise)
], ClassAccountResolver.prototype, "createClassAccount", null);
__decorate([
    (0, graphql_1.Query)(() => [class_account_entity_1.ClassAccount]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassAccountResolver.prototype, "allClassAccounts", null);
__decorate([
    (0, graphql_1.Query)(() => class_account_entity_1.ClassAccount),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassAccountResolver.prototype, "classAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => class_account_entity_1.ClassAccount),
    __param(0, (0, graphql_1.Args)('code')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateClassAccount_dto_1.UpdateClassAccountDto]),
    __metadata("design:returntype", Promise)
], ClassAccountResolver.prototype, "updateClassAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassAccountResolver.prototype, "deleteClassAccount", null);
exports.ClassAccountResolver = ClassAccountResolver = __decorate([
    (0, graphql_1.Resolver)(() => class_account_entity_1.ClassAccount),
    __metadata("design:paramtypes", [class_account_service_1.ClassAccountService])
], ClassAccountResolver);
//# sourceMappingURL=class-account.resolver.js.map