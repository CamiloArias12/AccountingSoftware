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
exports.TypeAccountService = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account/account.service");
const auxiliary_service_1 = require("./auxiliary/auxiliary.service");
const class_account_service_1 = require("./class-account/class-account.service");
const group_service_1 = require("./group/group.service");
const sub_account_service_1 = require("./sub-account/sub-account.service");
const typeorm_1 = require("@nestjs/typeorm");
const type_account_entity_1 = require("./type-account.entity");
const typeorm_2 = require("typeorm");
let TypeAccountService = class TypeAccountService {
    constructor(typeAccountRepository, accountService, auxiliaryService, classAccountService, groupService, subAccountService) {
        this.typeAccountRepository = typeAccountRepository;
        this.accountService = accountService;
        this.auxiliaryService = auxiliaryService;
        this.classAccountService = classAccountService;
        this.groupService = groupService;
        this.subAccountService = subAccountService;
    }
    async create(data) {
        const typeAccount = this.typeAccountRepository.create(data);
        return await this.typeAccountRepository.save(typeAccount);
    }
    async findAll() {
        return await this.typeAccountRepository.find();
    }
    async findOne(code) {
        const typeAccount = await this.typeAccountRepository.findOne({ where: { code } });
        if (!typeAccount) {
            throw new common_1.NotFoundException(`TypeAccount with code ${code} not found`);
        }
        return typeAccount;
    }
    async update(code, data) {
        await this.findOne(code);
        await this.typeAccountRepository.update({ code }, data);
        return this.findOne(code);
    }
    async remove(code) {
        const typeAccount = await this.findOne(code);
        await this.typeAccountRepository.remove(typeAccount);
    }
};
exports.TypeAccountService = TypeAccountService;
exports.TypeAccountService = TypeAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(type_account_entity_1.TypeAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        account_service_1.AccountService,
        auxiliary_service_1.AuxiliaryService,
        class_account_service_1.ClassAccountService,
        group_service_1.GroupService,
        sub_account_service_1.SubAccountService])
], TypeAccountService);
//# sourceMappingURL=type-account.service.js.map