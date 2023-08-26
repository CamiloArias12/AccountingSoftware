import { LocationService } from './location.service';
import { Location, Town } from './dto/typeData';
export declare class LocationResolver {
    private readonly locatioService;
    constructor(locatioService: LocationService);
    getCountry(): Promise<Location[]>;
    getState(isoCode: string): Promise<Location[]>;
    getTown(isoCodeCountry: string, isoCodeState: string): Promise<Town[]>;
}
