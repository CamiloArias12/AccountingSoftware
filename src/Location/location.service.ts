import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationService {

    async getGeoNamesChildren(geonameId: number = 3688536): Promise<any> {
        try {
            const response = await axios.get('http://api.geonames.org/children', {
                params: {
                    geonameId,
                    username: 'juan132',
                    fcode: 'HASC'
                }
            });
            return response.data;
        } catch (error) {
            throw new HttpException('Error al conectar con GeoNames', HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
