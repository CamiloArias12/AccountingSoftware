"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCreditModule = void 0;
const common_1 = require("@nestjs/common");
const type_credit_resolver_1 = require("./type-credit.resolver");
const type_credit_service_1 = require("./type-credit.service");
const typeorm_1 = require("@nestjs/typeorm");
const type_credit_entity_1 = require("./type-credit.entity");
let TypeCreditModule = class TypeCreditModule {
};
exports.TypeCreditModule = TypeCreditModule;
exports.TypeCreditModule = TypeCreditModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_credit_entity_1.TypeCredit])],
        providers: [type_credit_resolver_1.TypeCreditResolver, type_credit_service_1.TypeCreditService],
    })
], TypeCreditModule);
//# sourceMappingURL=type-credit.module.js.map