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
exports.GroupResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const group_service_1 = require("./group.service");
const group_entity_1 = require("./group.entity");
const createGroup_dto_1 = require("./dto/createGroup.dto");
const updateGroup_dto_1 = require("./dto/updateGroup.dto");
let GroupResolver = class GroupResolver {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async createGroup(input) {
        return await this.groupService.create(input);
    }
    async allGroups() {
        return await this.groupService.findAll();
    }
    async group(code) {
        return await this.groupService.findOne(code);
    }
    async updateGroup(code, input) {
        return await this.groupService.update(code, input);
    }
    async deleteGroup(code) {
        await this.groupService.remove(code);
        return true;
    }
};
exports.GroupResolver = GroupResolver;
__decorate([
    (0, graphql_1.Mutation)(() => group_entity_1.Group),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createGroup_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "createGroup", null);
__decorate([
    (0, graphql_1.Query)(() => [group_entity_1.Group]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "allGroups", null);
__decorate([
    (0, graphql_1.Query)(() => group_entity_1.Group),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "group", null);
__decorate([
    (0, graphql_1.Mutation)(() => group_entity_1.Group),
    __param(0, (0, graphql_1.Args)('code')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateGroup_dto_1.UpdateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "updateGroup", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "deleteGroup", null);
exports.GroupResolver = GroupResolver = __decorate([
    (0, graphql_1.Resolver)(() => group_entity_1.Group),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupResolver);
//# sourceMappingURL=group.resolver.js.map