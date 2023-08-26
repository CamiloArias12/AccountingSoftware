"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateModule = void 0;
const common_1 = require("@nestjs/common");
const affiliate_service_1 = require("./affiliate.service");
const affiliate_resolver_1 = require("./affiliate.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const affiliate_entity_1 = require("./affiliate.entity");
const user_module_1 = require("../user/user.module");
const beneficiary_affiliate_entity_1 = require("./beneficiary-affiliate/beneficiary-affiliate.entity");
const beneficiary_service_1 = require("./beneficiary/beneficiary.service");
const beneficiary_affiliate_service_1 = require("./beneficiary-affiliate/beneficiary-affiliate.service");
const beneficiary_entity_1 = require("./beneficiary/beneficiary.entity");
let AffiliateModule = class AffiliateModule {
};
exports.AffiliateModule = AffiliateModule;
exports.AffiliateModule = AffiliateModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([affiliate_entity_1.Affiliate, beneficiary_affiliate_entity_1.BeneficiaryAffiliate, beneficiary_entity_1.Beneficiary]), user_module_1.UserModule],
        providers: [affiliate_service_1.AffiliateService, affiliate_resolver_1.AffiliateResolver, beneficiary_service_1.BeneficiaryService, beneficiary_affiliate_service_1.BeneficiaryAffiliateService]
    })
], AffiliateModule);
//# sourceMappingURL=affiliate.module.js.map