import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Location} from './dto/typeData';
import { AxiosError } from 'axios';
import {countries} from './country'

@Injectable()
 export class LocationService {
      private readonly url= 'https://api.countrystatecity.in/v1/countries/'
      private readonly userName='username=Juan132'

   constructor (
            private readonly httpService:HttpService
   ){}

   async getCountries(): Promise <Location[]>{
      return countries  
   }


   async getState(isoCode:string): Promise <Location[]>{

      
      const  {data} = await firstValueFrom( this.httpService.get<Location[]>(`${this.url}${isoCode}/states`,
	    {
	       headers:{
		  Accept:'application/json',
		  "X-CSCAPI-KEY":'WXE4Ump5elZRMWFkdXdVYkpjTnZuQU5ZeENDWjJweXk5TDBIRTY3cA=='
	       },
	       
	    }).
	 pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
	    ))


      return data 
   }
 }




