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
exports.Company = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const enum_type_1 = require("./dto/enum-type");
let Company = class Company {
};
exports.Company = Company;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "typeIdentification", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Company.prototype, "numberIdentification", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Company.prototype, "digitVerification", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enum_type_1.Regime,
        default: enum_type_1.Regime.NO_RESPONSABLE_IUVA
    }),
    __metadata("design:type", String)
], Company.prototype, "regime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enum_type_1.TypePerson,
        default: enum_type_1.TypePerson.SOCIEDAD_COMANDITA_ACCIONES
    }),
    __metadata("design:type", String)
], Company.prototype, "typePerson", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "socialReason", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "legalRepresentativeTypeIdentificatio", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "legalRepresentativeName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "legalRepresentativeDocument", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "natureCompany", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
//# sourceMappingURL=company.entity.js.map