"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAccountModule = void 0;
const common_1 = require("@nestjs/common");
const sub_account_service_1 = require("./sub-account/sub-account.service");
const auxiliary_service_1 = require("./auxiliary/auxiliary.service");
const class_account_entity_1 = require("./class-account/class-account.entity");
const group_entity_1 = require("./group/group.entity");
const sub_account_entity_1 = require("./sub-account/sub-account.entity");
const auxiliary_entity_1 = require("./auxiliary/auxiliary.entity");
const account_entity_1 = require("./account/account.entity");
const type_account_service_1 = require("./type-account.service");
const account_service_1 = require("./account/account.service");
const group_service_1 = require("./group/group.service");
const typeorm_1 = require("@nestjs/typeorm");
const class_account_service_1 = require("./class-account/class-account.service");
const class_account_resolver_1 = require("./class-account/class-account.resolver");
const group_resolver_1 = require("./group/group.resolver");
const account_resolver_1 = require("./account/account.resolver");
const auxiliary_resolver_1 = require("./auxiliary/auxiliary.resolver");
const type_account_entity_1 = require("./type-account.entity");
const sub_account_resolver_1 = require("./sub-account/sub-account.resolver");
let TypeAccountModule = class TypeAccountModule {
};
exports.TypeAccountModule = TypeAccountModule;
exports.TypeAccountModule = TypeAccountModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_account_entity_1.TypeAccount, class_account_entity_1.ClassAccount, group_entity_1.Group, sub_account_entity_1.SubAccount, auxiliary_entity_1.Auxiliary, account_entity_1.Account])],
        providers: [type_account_service_1.TypeAccountService, class_account_service_1.ClassAccountService, group_service_1.GroupService, account_service_1.AccountService, sub_account_service_1.SubAccountService, auxiliary_service_1.AuxiliaryService, class_account_resolver_1.ClassAccountResolver, group_resolver_1.GroupResolver, account_resolver_1.AccountResolver, sub_account_resolver_1.SubAccountResolver, auxiliary_resolver_1.AuxiliaryResolver
        ],
        exports: [class_account_service_1.ClassAccountService]
    })
], TypeAccountModule);
//# sourceMappingURL=type-account.module.js.map