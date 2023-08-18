import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Countries, Country, StateOrTown, StatesOrTowns } from './dto/typeData';
import { error } from 'console';
import { AxiosError } from 'axios';


@Injectable()
 export class LocationService {
      private readonly url= 'http://api.geonames.org/'
      private readonly userName='username=Juan132'

   constructor (
            private readonly httpService:HttpService
   ){}

   async getCountries(): Promise <[Country]>{
      const  {data} = await firstValueFrom( this.httpService.get<Countries>(`${this.url}countryInfo?${this.userName}`,
	    {
	       headers:{
		  Accept:'application/json',
	       }
	    }))

      return data.geonames
   }

   async getStateAndTown(id:number): Promise <[StateOrTown]>{

      
      const  {data} = await firstValueFrom( this.httpService.get<StatesOrTowns>(`${this.url}children?geonameId=${id}&${this.userName}&fcode=HASC`,
	    {
	       headers:{
		  Accept:'application/json',
	       }
	    }).
	 pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
	    ))


      return data.geonames
   }

 }




