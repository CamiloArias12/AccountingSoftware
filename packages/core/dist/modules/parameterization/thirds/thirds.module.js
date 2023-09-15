"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThirdsModule = void 0;
const common_1 = require("@nestjs/common");
const location_module_1 = require("./location/location.module");
const affiliate_module_1 = require("./affiliate/affiliate.module");
const employee_module_1 = require("./employee/employee.module");
const provider_module_1 = require("./provider/provider.module");
let ThirdsModule = class ThirdsModule {
};
exports.ThirdsModule = ThirdsModule;
exports.ThirdsModule = ThirdsModule = __decorate([
    (0, common_1.Module)({
        imports: [location_module_1.LocationModule, affiliate_module_1.AffiliateModule, employee_module_1.EmployeeModule, provider_module_1.ProviderModule],
        providers: []
    })
], ThirdsModule);
//# sourceMappingURL=thirds.module.js.map