import { Resolver } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Query } from '@nestjs/graphql';
import { CountriesTest, Country } from './dto/typeData';


@Resolver()
export class LocationResolver {

   constructor(private readonly locatioService:LocationService){}
   @Query(() => [Country])
   getCountry(){
      return this.locatioService.getCountries();
   }


}
