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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const location_service_1 = require("./location.service");
const graphql_2 = require("@nestjs/graphql");
const typeData_1 = require("./dto/typeData");
let LocationResolver = class LocationResolver {
    constructor(locatioService) {
        this.locatioService = locatioService;
    }
    async getCountry() {
        return await this.locatioService.getCountries();
    }
    async getState(isoCode) {
        return this.locatioService.getState(isoCode);
    }
    async getTown(isoCodeCountry, isoCodeState) {
        return this.locatioService.getTown(isoCodeCountry, isoCodeState);
    }
};
exports.LocationResolver = LocationResolver;
__decorate([
    (0, graphql_2.Query)(() => [typeData_1.Location]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "getCountry", null);
__decorate([
    (0, graphql_2.Query)(() => [typeData_1.Location]),
    __param(0, (0, graphql_1.Args)('isoCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "getState", null);
__decorate([
    (0, graphql_2.Query)(() => [typeData_1.Town]),
    __param(0, (0, graphql_1.Args)('isoCodeCountry')),
    __param(1, (0, graphql_1.Args)('isoCodeState')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "getTown", null);
exports.LocationResolver = LocationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationResolver);
//# sourceMappingURL=location.resolver.js.map