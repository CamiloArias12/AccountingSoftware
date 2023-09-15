"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterizationModule = void 0;
const common_1 = require("@nestjs/common");
const thirds_module_1 = require("./thirds/thirds.module");
const type_saving_module_1 = require("./type-saving/type-saving.module");
const type_credit_module_1 = require("./type-credit/type-credit.module");
const type_account_module_1 = require("./type-account/type-account.module");
const auth_module_1 = require("./auth/auth.module");
let ParameterizationModule = class ParameterizationModule {
};
exports.ParameterizationModule = ParameterizationModule;
exports.ParameterizationModule = ParameterizationModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, thirds_module_1.ThirdsModule, type_account_module_1.TypeAccountModule, type_saving_module_1.TypeSavingModule, type_credit_module_1.TypeCreditModule],
    })
], ParameterizationModule);
//# sourceMappingURL=parameterization.module.js.map