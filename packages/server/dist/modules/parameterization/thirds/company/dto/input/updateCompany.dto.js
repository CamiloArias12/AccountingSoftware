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
exports.UpdateCompanyDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_type_1 = require("../enum-type");
let UpdateCompanyDto = class UpdateCompanyDto {
};
exports.UpdateCompanyDto = UpdateCompanyDto;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "typeIdentification", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateCompanyDto.prototype, "numberIdentification", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateCompanyDto.prototype, "digitVerification", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_type_1.Regime, { nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "regime", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_type_1.TypePerson, { nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "typePerson", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "socialReason", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "legalRepresentativeTypeIdentificatio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "legalRepresentativeName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "legalRepresentativeDocument", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "natureCompany", void 0);
exports.UpdateCompanyDto = UpdateCompanyDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateCompanyDto);
//# sourceMappingURL=updateCompany.dto.js.map