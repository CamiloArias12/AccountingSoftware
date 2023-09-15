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
exports.TypeAccount = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_account_entity_1 = require("./class-account/class-account.entity");
const account_entity_1 = require("./account/account.entity");
const auxiliary_entity_1 = require("./auxiliary/auxiliary.entity");
const group_entity_1 = require("./group/group.entity");
const sub_account_entity_1 = require("./sub-account/sub-account.entity");
let TypeAccount = class TypeAccount {
};
exports.TypeAccount = TypeAccount;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TypeAccount.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeAccount.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeAccount.prototype, "nature", void 0);
__decorate([
    (0, graphql_1.Field)(() => account_entity_1.Account),
    (0, typeorm_1.OneToOne)(() => account_entity_1.Account, account => account.typeAccount),
    __metadata("design:type", account_entity_1.Account)
], TypeAccount.prototype, "account", void 0);
__decorate([
    (0, graphql_1.Field)(() => auxiliary_entity_1.Auxiliary),
    (0, typeorm_1.OneToOne)(() => auxiliary_entity_1.Auxiliary, auxiliary => auxiliary.typeAccount),
    __metadata("design:type", auxiliary_entity_1.Auxiliary)
], TypeAccount.prototype, "auxiliary", void 0);
__decorate([
    (0, graphql_1.Field)(() => group_entity_1.Group),
    (0, typeorm_1.OneToOne)(() => group_entity_1.Group, group => group.typeAccount),
    __metadata("design:type", group_entity_1.Group)
], TypeAccount.prototype, "group", void 0);
__decorate([
    (0, graphql_1.Field)(() => class_account_entity_1.ClassAccount),
    (0, typeorm_1.OneToOne)(() => class_account_entity_1.ClassAccount, classAccount => classAccount.typeAccount),
    __metadata("design:type", class_account_entity_1.ClassAccount)
], TypeAccount.prototype, "classAccount", void 0);
__decorate([
    (0, graphql_1.Field)(() => sub_account_entity_1.SubAccount),
    (0, typeorm_1.OneToOne)(() => sub_account_entity_1.SubAccount, subAccount => subAccount.typeAccount),
    __metadata("design:type", sub_account_entity_1.SubAccount)
], TypeAccount.prototype, "subAccount", void 0);
exports.TypeAccount = TypeAccount = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], TypeAccount);
//# sourceMappingURL=type-account.entity.js.map