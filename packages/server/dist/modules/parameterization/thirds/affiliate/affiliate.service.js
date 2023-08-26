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
exports.AffiliateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const affiliate_entity_1 = require("./affiliate.entity");
const user_service_1 = require("../user/user.service");
const beneficiary_affiliate_entity_1 = require("./beneficiary-affiliate/beneficiary-affiliate.entity");
const beneficiary_entity_1 = require("./beneficiary/beneficiary.entity");
const beneficiary_service_1 = require("./beneficiary/beneficiary.service");
let AffiliateService = class AffiliateService {
    constructor(affiliateRepository, userService, beneficiaryService, dataSource) {
        this.affiliateRepository = affiliateRepository;
        this.userService = userService;
        this.beneficiaryService = beneficiaryService;
        this.dataSource = dataSource;
    }
    async create(affiliateInput, userInput, beneficiaryInput, beneficiariesPercentage) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const user = await this.userService.findOne(userInput.identification);
        try {
            if (!user) {
                const affiliate = this.affiliateRepository.create(affiliateInput);
                await this.userService.createUser(userInput, queryRunner).then((user) => {
                    affiliate.user = user;
                });
                await queryRunner.manager.save(affiliate_entity_1.Affiliate, affiliate);
                for (const data of beneficiaryInput) {
                    const queryBeneficiary = await queryRunner.manager.findOneBy(beneficiary_entity_1.Beneficiary, { idDocument: data.idDocument });
                    if (!queryBeneficiary) {
                        const beneficiary = new beneficiary_entity_1.Beneficiary();
                        beneficiary.idDocument = data.idDocument;
                        beneficiary.name = data.name;
                        await this.beneficiaryService.create(beneficiary, queryRunner);
                    }
                    const beneficiaryAffiliate = new beneficiary_affiliate_entity_1.BeneficiaryAffiliate();
                    const beneficiary = new beneficiary_entity_1.Beneficiary();
                    beneficiary.idDocument = data.idDocument;
                    beneficiary.name = data.name;
                    beneficiaryAffiliate.affiliate = affiliate;
                    beneficiaryAffiliate.beneficiary = beneficiary;
                    beneficiaryAffiliate.percentage = beneficiariesPercentage[0];
                    beneficiariesPercentage.shift();
                    await queryRunner.manager.save(beneficiary_affiliate_entity_1.BeneficiaryAffiliate, beneficiaryAffiliate);
                }
                await queryRunner.commitTransaction();
                return affiliate;
            }
        }
        catch (a) {
            console.log("Error transaccion", a);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return await this.affiliateRepository.find();
    }
    async findOne(identification) {
        const user = this.affiliateRepository
            .createQueryBuilder('affiliate')
            .leftJoinAndSelect('affiliate.user', 'user')
            .leftJoinAndSelect('affiliate.beneficiaries', 'beneficiaryAffiliate')
            .leftJoinAndSelect('beneficiaryAffiliate.beneficiary', 'beneficiary')
            .where('affiliate.idAffiliate = :identification', { identification: identification });
        return await user.getOne();
    }
    async update(numberAccount, updateDto) {
        const afiliate = await this.affiliateRepository.preload({ numberAccount, ...updateDto });
        if (!afiliate) {
            throw new common_1.NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
        }
        return await this.affiliateRepository.save(afiliate);
    }
};
exports.AffiliateService = AffiliateService;
exports.AffiliateService = AffiliateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(affiliate_entity_1.Affiliate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        beneficiary_service_1.BeneficiaryService,
        typeorm_2.DataSource])
], AffiliateService);
//# sourceMappingURL=affiliate.service.js.map