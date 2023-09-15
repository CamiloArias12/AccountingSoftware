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
exports.CompanyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const company_service_1 = require("./company.service");
const company_entity_1 = require("./company.entity");
const createCompany_dto_1 = require("./dto/input/createCompany.dto");
const updateCompany_dto_1 = require("./dto/input/updateCompany.dto");
let CompanyResolver = class CompanyResolver {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createCompany(input) {
        return await this.companyService.create(input);
    }
    async allCompanies() {
        return await this.companyService.findAll();
    }
    async company(numberIdentification) {
        return await this.companyService.findOne(numberIdentification);
    }
    async updateCompany(numberIdentification, input) {
        return await this.companyService.update(numberIdentification, input);
    }
    async deleteCompany(numberIdentification) {
        await this.companyService.remove(numberIdentification);
        return true;
    }
};
exports.CompanyResolver = CompanyResolver;
__decorate([
    (0, graphql_1.Mutation)(() => company_entity_1.Company),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCompany_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "createCompany", null);
__decorate([
    (0, graphql_1.Query)(() => [company_entity_1.Company]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "allCompanies", null);
__decorate([
    (0, graphql_1.Query)(() => company_entity_1.Company),
    __param(0, (0, graphql_1.Args)('numberIdentification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "company", null);
__decorate([
    (0, graphql_1.Mutation)(() => company_entity_1.Company),
    __param(0, (0, graphql_1.Args)('numberIdentification')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateCompany_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "updateCompany", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('numberIdentification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "deleteCompany", null);
exports.CompanyResolver = CompanyResolver = __decorate([
    (0, graphql_1.Resolver)(() => company_entity_1.Company),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyResolver);
//# sourceMappingURL=company.resolver.js.map