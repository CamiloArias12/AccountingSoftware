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
exports.AffiliateResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const affiliate_service_1 = require("./affiliate.service");
const affiliate_entity_1 = require("./affiliate.entity");
const updateAfiliate_dto_1 = require("./dto/updateAfiliate.dto");
const createAfiliate_dto_1 = require("./dto/createAfiliate.dto");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/user.entity");
const createBeneficiary_dto_1 = require("./beneficiary/dto/createBeneficiary.dto");
const createuser_dto_1 = require("../user/dto/input/createuser.dto");
let AffiliateResolver = class AffiliateResolver {
    constructor(afiliateService, userService) {
        this.afiliateService = afiliateService;
        this.userService = userService;
    }
    async createAfiliate(inputAffiliate, inputUser, inputBeneficiaries) {
        return await this.afiliateService.create(inputAffiliate, inputUser, inputBeneficiaries.beneficiaries, inputBeneficiaries.percentage);
    }
    async allAfiliates() {
        return await this.afiliateService.findAll();
    }
    async getAffiliate(identification) {
        return await this.afiliateService.findOne(identification);
    }
    async afiliate(id) {
        return await this.userService.findOne(id);
    }
    async updateAfiliate(id, input) {
        return await this.afiliateService.update(id, input);
    }
};
exports.AffiliateResolver = AffiliateResolver;
__decorate([
    (0, graphql_1.Mutation)(() => affiliate_entity_1.Affiliate),
    __param(0, (0, graphql_1.Args)('inputAffiliate')),
    __param(1, (0, graphql_1.Args)('inputUser')),
    __param(2, (0, graphql_1.Args)('inputBeneficiaries')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAfiliate_dto_1.CreateAfiliateDto, createuser_dto_1.UserInput, createBeneficiary_dto_1.BeneficiariesInput]),
    __metadata("design:returntype", Promise)
], AffiliateResolver.prototype, "createAfiliate", null);
__decorate([
    (0, graphql_1.Query)(() => [affiliate_entity_1.Affiliate]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AffiliateResolver.prototype, "allAfiliates", null);
__decorate([
    (0, graphql_1.Query)(() => affiliate_entity_1.Affiliate),
    __param(0, (0, graphql_1.Args)('identification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AffiliateResolver.prototype, "getAffiliate", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AffiliateResolver.prototype, "afiliate", null);
__decorate([
    (0, graphql_1.Mutation)(() => affiliate_entity_1.Affiliate),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAfiliate_dto_1.UpdateAfiliateDto]),
    __metadata("design:returntype", Promise)
], AffiliateResolver.prototype, "updateAfiliate", null);
exports.AffiliateResolver = AffiliateResolver = __decorate([
    (0, graphql_1.Resolver)(() => affiliate_entity_1.Affiliate),
    __metadata("design:paramtypes", [affiliate_service_1.AffiliateService,
        user_service_1.UserService])
], AffiliateResolver);
//# sourceMappingURL=affiliate.resolver.js.map