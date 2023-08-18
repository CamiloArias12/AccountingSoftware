import { Args, Resolver } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Query } from '@nestjs/graphql';
import { Country, StateOrTown } from './dto/typeData';


@Resolver()
export class LocationResolver {

   constructor(private readonly locatioService:LocationService){}
   @Query(() => [Country])
   async getCountry(){
      return await this.locatioService.getCountries();
   }
   

   @Query(() =>[StateOrTown])
   async getStateOrTown(@Args('id')id:number){
      return await this.locatioService.getStateAndTown(id);
   }

}
