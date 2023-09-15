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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./group.entity");
const type_account_service_1 = require("../type-account.service");
let GroupService = class GroupService {
    constructor(groupRepository, typeAccountService) {
        this.groupRepository = groupRepository;
        this.typeAccountService = typeAccountService;
    }
    async create(createGroupDto) {
        const typeAccount = await this.typeAccountService.create(createGroupDto);
        if (typeAccount) {
            const group = new group_entity_1.Group();
            group.typeAccount = typeAccount;
            return await this.groupRepository.save(group);
        }
    }
    async findAll() {
        return await this.groupRepository.find();
    }
    async findOne(code) {
        const group = await this.groupRepository.findOne({
            where: {
                code,
            },
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group with code ${code} not found`);
        }
        return group;
    }
    async update(code, updateGroupDto) {
        const group = await this.groupRepository.preload({
            code: code,
            ...updateGroupDto,
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group with code ${code} not found`);
        }
        return await this.groupRepository.save(group);
    }
    async remove(code) {
        const group = await this.findOne(code);
        await this.groupRepository.remove(group);
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        type_account_service_1.TypeAccountService])
], GroupService);
//# sourceMappingURL=group.service.js.map