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
exports.TypeSavingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const type_saving_entity_1 = require("./type-saving.entity");
let TypeSavingService = class TypeSavingService {
    constructor(typeSavingRepository) {
        this.typeSavingRepository = typeSavingRepository;
    }
    async create(createTypeSavingDto) {
        const typeSaving = this.typeSavingRepository.create(createTypeSavingDto);
        return await this.typeSavingRepository.save(typeSaving);
    }
    async findAll() {
        return await this.typeSavingRepository.find();
    }
    async findOne(id) {
        const typeSaving = await this.typeSavingRepository.findOne({
            where: {
                id,
            },
        });
        if (!typeSaving) {
            throw new common_1.NotFoundException(`TypeSaving with ID ${id} not found`);
        }
        return typeSaving;
    }
    async update(id, updateTypeSavingDto) {
        const typeSaving = await this.typeSavingRepository.preload({
            id: id,
            ...updateTypeSavingDto,
        });
        if (!typeSaving) {
            throw new common_1.NotFoundException(`TypeSaving with ID ${id} not found`);
        }
        return await this.typeSavingRepository.save(typeSaving);
    }
    async remove(id) {
        const typeSaving = await this.findOne(id);
        await this.typeSavingRepository.remove(typeSaving);
    }
};
exports.TypeSavingService = TypeSavingService;
exports.TypeSavingService = TypeSavingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(type_saving_entity_1.TypeSaving)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeSavingService);
//# sourceMappingURL=type-saving.service.js.map