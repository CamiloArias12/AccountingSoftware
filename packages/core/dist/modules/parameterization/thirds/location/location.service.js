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
exports.LocationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const country_1 = require("./country");
const config_1 = require("@nestjs/config");
let LocationService = class LocationService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.url = 'https://api.countrystatecity.in/v1/countries/';
        console.log(this.configService.get('API_KEY'));
    }
    async getCountries() {
        return country_1.countries;
    }
    async getState(isoCode) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.url}${isoCode}/states`, {
            headers: {
                Accept: 'application/json',
                "X-CSCAPI-KEY": this.configService.get('API_KEY')
            },
        }));
        return data;
    }
    async getTown(isoCodeCountry, isoCodeState) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.url}${isoCodeCountry}/states/${isoCodeState}/cities`, {
            headers: {
                Accept: 'application/json',
                "X-CSCAPI-KEY": this.configService.get('API_KEY')
            },
        }));
        return data;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], LocationService);
//# sourceMappingURL=location.service.js.map