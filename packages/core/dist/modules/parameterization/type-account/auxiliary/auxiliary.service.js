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
exports.AuxiliaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auxiliary_entity_1 = require("./auxiliary.entity");
const type_account_service_1 = require("../type-account.service");
let AuxiliaryService = class AuxiliaryService {
    constructor(auxiliaryRepository, typeAccountService) {
        this.auxiliaryRepository = auxiliaryRepository;
        this.typeAccountService = typeAccountService;
    }
    async create(createAuxiliaryDto) {
        const typeAccount = await this.typeAccountService.create(createAuxiliaryDto);
        if (typeAccount) {
            const auxiliary = new auxiliary_entity_1.Auxiliary();
            auxiliary.typeAccount = typeAccount;
            return await this.auxiliaryRepository.save(auxiliary);
        }
    }
    async findAll() {
        return await this.auxiliaryRepository.find();
    }
    async findOne(code) {
        const auxiliary = await this.auxiliaryRepository.findOne({
            where: {
                code,
            },
        });
        if (!auxiliary) {
            throw new common_1.NotFoundException(`Auxiliary with code ${code} not found`);
        }
        return auxiliary;
    }
    async update(code, updateAuxiliaryDto) {
        const auxiliary = await this.auxiliaryRepository.preload({
            code: code,
            ...updateAuxiliaryDto,
        });
        if (!auxiliary) {
            throw new common_1.NotFoundException(`Auxiliary with code ${code} not found`);
        }
        return await this.auxiliaryRepository.save(auxiliary);
    }
    async remove(code) {
        const auxiliary = await this.findOne(code);
        await this.auxiliaryRepository.remove(auxiliary);
    }
};
exports.AuxiliaryService = AuxiliaryService;
exports.AuxiliaryService = AuxiliaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auxiliary_entity_1.Auxiliary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        type_account_service_1.TypeAccountService])
], AuxiliaryService);
//# sourceMappingURL=auxiliary.service.js.map