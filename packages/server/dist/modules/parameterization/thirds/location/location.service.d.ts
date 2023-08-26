import { HttpService } from '@nestjs/axios';
import { Location, Town } from './dto/typeData';
import { ConfigService } from '@nestjs/config';
export declare class LocationService {
    private readonly httpService;
    private configService;
    private readonly url;
    constructor(httpService: HttpService, configService: ConfigService);
    getCountries(): Promise<Location[]>;
    getState(isoCode: string): Promise<Location[]>;
    getTown(isoCodeCountry: string, isoCodeState: string): Promise<Town[]>;
}
