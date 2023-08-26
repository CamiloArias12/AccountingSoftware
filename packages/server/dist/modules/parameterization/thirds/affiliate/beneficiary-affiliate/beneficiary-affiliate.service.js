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
exports.BeneficiaryAffiliateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const beneficiary_affiliate_entity_1 = require("./beneficiary-affiliate.entity");
const typeorm_2 = require("typeorm");
let BeneficiaryAffiliateService = class BeneficiaryAffiliateService {
    constructor(beneficiaryAffiliateRepository) {
        this.beneficiaryAffiliateRepository = beneficiaryAffiliateRepository;
    }
    async create(beneficiaryAffiliate, queryRunner) {
        if (queryRunner) {
            return queryRunner.manager.save(beneficiary_affiliate_entity_1.BeneficiaryAffiliate, beneficiaryAffiliate);
        }
        else {
            return this.beneficiaryAffiliateRepository.save(beneficiaryAffiliate);
        }
    }
};
exports.BeneficiaryAffiliateService = BeneficiaryAffiliateService;
exports.BeneficiaryAffiliateService = BeneficiaryAffiliateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(beneficiary_affiliate_entity_1.BeneficiaryAffiliate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BeneficiaryAffiliateService);
//# sourceMappingURL=beneficiary-affiliate.service.js.map