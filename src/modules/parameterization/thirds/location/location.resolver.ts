import { Args, Resolver } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Query } from '@nestjs/graphql';
import { Location } from './dto/typeData';


@Resolver()
export class LocationResolver {

   constructor(private readonly locatioService:LocationService){}
   @Query(() => [Location])
   async getCountry(){
      return await this.locatioService.getCountries();
   }
   

   @Query(() =>[Location])
   async getStateOrTown(@Args('isoCode')isoCode:string){
      return this.locatioService.getState(isoCode);
   }

}
