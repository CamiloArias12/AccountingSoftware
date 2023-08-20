import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Location, Town} from './dto/typeData';
import { AxiosError } from 'axios';
import {countries} from './country'

@Injectable()
 export class LocationService {
      private readonly url= 'https://api.countrystatecity.in/v1/countries/'

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

   async getTown(isoCodeCountry:string,isoCodeState:string): Promise <Town[]>{

      const  {data} = await firstValueFrom( this.httpService.get<Town[]>(`${this.url}${isoCodeCountry}/states/${isoCodeState}/cities`,
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




