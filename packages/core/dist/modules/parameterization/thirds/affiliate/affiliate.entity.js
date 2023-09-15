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
exports.Affiliate = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const beneficiary_affiliate_entity_1 = require("./beneficiary-affiliate/beneficiary-affiliate.entity");
let Affiliate = class Affiliate {
};
exports.Affiliate = Affiliate;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Affiliate.prototype, "idAffiliate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Affiliate.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Affiliate.prototype, "addreesCompany", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Affiliate.prototype, "emailJob", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Affiliate.prototype, "salary", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Affiliate.prototype, "bank", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Affiliate.prototype, "jobTitle", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Affiliate.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Affiliate.prototype, "incomeCompany", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Affiliate.prototype, "typeAccount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Affiliate.prototype, "numberAccount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.affiliate),
    (0, typeorm_1.JoinColumn)({ name: 'idAffiliate' }),
    __metadata("design:type", user_entity_1.User)
], Affiliate.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => [beneficiary_affiliate_entity_1.BeneficiaryAffiliate]),
    (0, typeorm_1.OneToMany)(() => beneficiary_affiliate_entity_1.BeneficiaryAffiliate, beneficiaryAffiliate => beneficiaryAffiliate.affiliate),
    __metadata("design:type", Array)
], Affiliate.prototype, "beneficiaries", void 0);
exports.Affiliate = Affiliate = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Affiliate);
//# sourceMappingURL=affiliate.entity.js.map