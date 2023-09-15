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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const class_account_entity_1 = require("../class-account/class-account.entity");
const type_account_entity_1 = require("../type-account.entity");
let Group = class Group {
};
exports.Group = Group;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Group.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_account_entity_1.ClassAccount, classAccount => classAccount.groups),
    __metadata("design:type", class_account_entity_1.ClassAccount)
], Group.prototype, "classAccount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, account => account.group),
    __metadata("design:type", Array)
], Group.prototype, "accounts", void 0);
__decorate([
    (0, graphql_1.Field)(() => type_account_entity_1.TypeAccount),
    (0, typeorm_1.OneToOne)(() => type_account_entity_1.TypeAccount, typeAccount => typeAccount.group),
    (0, typeorm_1.JoinColumn)({ name: "code" }),
    __metadata("design:type", type_account_entity_1.TypeAccount)
], Group.prototype, "typeAccount", void 0);
exports.Group = Group = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Group);
//# sourceMappingURL=group.entity.js.map