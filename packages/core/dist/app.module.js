"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const parameterization_module_1 = require("./modules/parameterization/parameterization.module");
const path_1 = require("path");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const affiliate_entity_1 = require("./modules/parameterization/thirds/affiliate/affiliate.entity");
const user_entity_1 = require("./modules/parameterization/thirds/user/user.entity");
const employee_entity_1 = require("./modules/parameterization/thirds/employee/employee.entity");
const type_account_entity_1 = require("./modules/parameterization/type-account/type-account.entity");
const account_entity_1 = require("./modules/parameterization/type-account/account/account.entity");
const sub_account_entity_1 = require("./modules/parameterization/type-account/sub-account/sub-account.entity");
const class_account_entity_1 = require("./modules/parameterization/type-account/class-account/class-account.entity");
const auxiliary_entity_1 = require("./modules/parameterization/type-account/auxiliary/auxiliary.entity");
const group_entity_1 = require("./modules/parameterization/type-account/group/group.entity");
const beneficiary_entity_1 = require("./modules/parameterization/thirds/affiliate/beneficiary/beneficiary.entity");
const beneficiary_affiliate_entity_1 = require("./modules/parameterization/thirds/affiliate/beneficiary-affiliate/beneficiary-affiliate.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [parameterization_module_1.ParameterizationModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql')
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                keepConnectionAlive: true,
                synchronize: true,
                entities: [user_entity_1.User, affiliate_entity_1.Affiliate, employee_entity_1.Employee, beneficiary_entity_1.Beneficiary, beneficiary_affiliate_entity_1.BeneficiaryAffiliate, type_account_entity_1.TypeAccount, account_entity_1.Account, sub_account_entity_1.SubAccount, class_account_entity_1.ClassAccount, auxiliary_entity_1.Auxiliary, group_entity_1.Group]
            }),
        ],
        providers: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map