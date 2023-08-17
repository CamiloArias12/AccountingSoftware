import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Countries, Country } from './dto/typeData';


@Injectable()
 export class LocationService {
      private readonly url= 'http://api.geonames.org/'
      private readonly userName='?username=Juan132'

   constructor (
            private readonly httpService:HttpService
   ){}

   async getCountries(): Promise <[Country]>{
      const  {data} = await firstValueFrom( this.httpService.get<Countries>(`${this.url}countryInfo${this.userName}`,
	    {
	       headers:{
		  Accept:'application/json',
	       }
	    }))

      return data.geonames
   }

 }




