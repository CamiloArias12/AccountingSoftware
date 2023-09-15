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
exports.AccountResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const account_service_1 = require("./account.service");
const account_entity_1 = require("./account.entity");
const createAccount_dto_1 = require("./dto/createAccount.dto");
const updateAccount_dto_1 = require("./dto/updateAccount.dto");
let AccountResolver = class AccountResolver {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async createAccount(input) {
        return await this.accountService.create(input);
    }
    async allAccounts() {
        return await this.accountService.findAll();
    }
    async account(code) {
        return await this.accountService.findOne(code);
    }
    async updateAccount(code, input) {
        return await this.accountService.update(code, input);
    }
    async deleteAccount(code) {
        await this.accountService.remove(code);
        return true;
    }
};
exports.AccountResolver = AccountResolver;
__decorate([
    (0, graphql_1.Mutation)(() => account_entity_1.Account),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAccount_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "createAccount", null);
__decorate([
    (0, graphql_1.Query)(() => [account_entity_1.Account]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "allAccounts", null);
__decorate([
    (0, graphql_1.Query)(() => account_entity_1.Account),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "account", null);
__decorate([
    (0, graphql_1.Mutation)(() => account_entity_1.Account),
    __param(0, (0, graphql_1.Args)('code')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAccount_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "deleteAccount", null);
exports.AccountResolver = AccountResolver = __decorate([
    (0, graphql_1.Resolver)(() => account_entity_1.Account),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountResolver);
//# sourceMappingURL=account.resolver.js.map