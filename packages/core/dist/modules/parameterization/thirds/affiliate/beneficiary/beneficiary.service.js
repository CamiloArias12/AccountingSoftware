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
exports.BeneficiaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const beneficiary_entity_1 = require("./beneficiary.entity");
let BeneficiaryService = class BeneficiaryService {
    constructor(beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }
    async create(dto, queryRunner) {
        const beneficiary = this.beneficiaryRepository.create(dto);
        if (queryRunner) {
            return queryRunner.manager.save(beneficiary_entity_1.Beneficiary, beneficiary);
        }
        else {
            return await this.beneficiaryRepository.save(beneficiary);
        }
    }
    async findAll() {
        return await this.beneficiaryRepository.find();
    }
    async findOne(idDocument) {
        const beneficiary = await this.beneficiaryRepository.findOne({
            where: {
                idDocument,
            },
        });
        if (!beneficiary) {
            throw new common_1.NotFoundException(`Beneficiary with ID ${idDocument} not found`);
        }
        return beneficiary;
    }
    async update(idDocument, updateDto) {
        const beneficiary = await this.beneficiaryRepository.preload({ idDocument, ...updateDto });
        if (!beneficiary) {
            throw new common_1.NotFoundException(`Beneficiary with ID ${idDocument} not found`);
        }
        return await this.beneficiaryRepository.save(beneficiary);
    }
    async remove(id) {
        const beneficiary = await this.findOne(id);
        await this.beneficiaryRepository.remove(beneficiary);
    }
};
exports.BeneficiaryService = BeneficiaryService;
exports.BeneficiaryService = BeneficiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(beneficiary_entity_1.Beneficiary)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BeneficiaryService);
//# sourceMappingURL=beneficiary.service.js.map