import { Module } from '@nestjs/common';
import { TownService } from './town.service';
import { TownResolver } from './town.resolver';

@Module({
  providers: [TownService, TownResolver]
})
export class TownModule {}
