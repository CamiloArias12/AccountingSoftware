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
exports.UserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_type_1 = require("../enum-type");
let UserInput = class UserInput {
};
exports.UserInput = UserInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "typeidentification", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserInput.prototype, "identification", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], UserInput.prototype, "expeditionDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "expeditionCity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "countryCard", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "municipalityCard", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "cityCard", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "statusCivil", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "addressResidence", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "municipality", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserInput.prototype, "landLine", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "housingType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "studies", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "profession", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserInput.prototype, "foreignOperations", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserInput.prototype, "publicResources", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserInput.prototype, "publicRecognition", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserInput.prototype, "publicPower", void 0);
exports.UserInput = UserInput = __decorate([
    (0, graphql_1.InputType)()
], UserInput);
//# sourceMappingURL=createuser.dto.js.map