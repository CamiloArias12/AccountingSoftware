import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';

@Module({
  providers: [CountryResolver]
})
export class CountryModule {}
