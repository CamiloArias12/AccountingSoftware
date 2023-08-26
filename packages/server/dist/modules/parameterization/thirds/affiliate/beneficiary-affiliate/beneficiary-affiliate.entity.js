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
exports.BeneficiaryAffiliate = void 0;
const typeorm_1 = require("typeorm");
const beneficiary_entity_1 = require("../beneficiary/beneficiary.entity");
const graphql_1 = require("@nestjs/graphql");
const affiliate_entity_1 = require("../affiliate.entity");
let BeneficiaryAffiliate = class BeneficiaryAffiliate {
};
exports.BeneficiaryAffiliate = BeneficiaryAffiliate;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], BeneficiaryAffiliate.prototype, "idAffiliate", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], BeneficiaryAffiliate.prototype, "idBeneficiary", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BeneficiaryAffiliate.prototype, "percentage", void 0);
__decorate([
    (0, graphql_1.Field)(() => beneficiary_entity_1.Beneficiary),
    (0, typeorm_1.ManyToOne)(() => beneficiary_entity_1.Beneficiary, beneficiary => beneficiary.beneficiaryAffiliate),
    (0, typeorm_1.JoinColumn)({ name: "idBeneficiary" }),
    __metadata("design:type", beneficiary_entity_1.Beneficiary)
], BeneficiaryAffiliate.prototype, "beneficiary", void 0);
__decorate([
    (0, graphql_1.Field)(() => affiliate_entity_1.Affiliate),
    (0, typeorm_1.ManyToOne)(() => affiliate_entity_1.Affiliate, affiliate => affiliate.beneficiaries),
    (0, typeorm_1.JoinColumn)({ name: "idAffiliate" }),
    __metadata("design:type", affiliate_entity_1.Affiliate)
], BeneficiaryAffiliate.prototype, "affiliate", void 0);
exports.BeneficiaryAffiliate = BeneficiaryAffiliate = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], BeneficiaryAffiliate);
//# sourceMappingURL=beneficiary-affiliate.entity.js.map