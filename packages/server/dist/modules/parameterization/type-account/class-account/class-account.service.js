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
exports.ClassAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_account_entity_1 = require("./class-account.entity");
const type_account_service_1 = require("../type-account.service");
let ClassAccountService = class ClassAccountService {
    constructor(classAccountRepository, typeAccountService) {
        this.classAccountRepository = classAccountRepository;
        this.typeAccountService = typeAccountService;
    }
    async create(createClassAccountDto) {
        const typeAccount = await this.typeAccountService.create(createClassAccountDto);
        if (typeAccount) {
            const classAccount = new class_account_entity_1.ClassAccount();
            classAccount.typeAccount = typeAccount;
            return await this.classAccountRepository.save(classAccount);
        }
    }
    async findAll() {
        return await this.classAccountRepository.find();
    }
    async findOne(code) {
        const classAccount = await this.classAccountRepository.findOne({
            where: {
                code,
            },
        });
        if (!classAccount) {
            throw new common_1.NotFoundException(`ClassAccount with code ${code} not found`);
        }
        return classAccount;
    }
    async update(code, updateClassAccountDto) {
        const classAccount = await this.classAccountRepository.preload({
            code: code,
            ...updateClassAccountDto,
        });
        if (!classAccount) {
            throw new common_1.NotFoundException(`ClassAccount with code ${code} not found`);
        }
        return await this.classAccountRepository.save(classAccount);
    }
    async remove(code) {
        const classAccount = await this.findOne(code);
        await this.classAccountRepository.remove(classAccount);
    }
};
exports.ClassAccountService = ClassAccountService;
exports.ClassAccountService = ClassAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_account_entity_1.ClassAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        type_account_service_1.TypeAccountService])
], ClassAccountService);
//# sourceMappingURL=class-account.service.js.map