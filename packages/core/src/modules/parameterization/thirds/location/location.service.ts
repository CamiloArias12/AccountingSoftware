import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Location, Town } from './dto/typeData';
import { countries } from './country';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocationService {
  private readonly url = 'https://api.countrystatecity.in/v1/countries/';

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    console.log(this.configService.get('API_KEY'));
  }

  async getCountries(): Promise<Location[]> {
    return countries;
  }

  async getState(isoCode: string): Promise<Location[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Location[]>(`${this.url}${isoCode}/states`, {
        headers: {
          Accept: 'application/json',
          'X-CSCAPI-KEY': this.configService.get<string>('API_KEY'),
        },
      }),
    );

    return data;
  }

  async getTown(isoCodeCountry: string, isoCodeState: string): Promise<Town[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Town[]>(
        `${this.url}${isoCodeCountry}/states/${isoCodeState}/cities`,
        {
          headers: {
            Accept: 'application/json',
            'X-CSCAPI-KEY': this.configService.get<string>('API_KEY'),
          },
        },
      ),
    );
    return data;
  }
}
