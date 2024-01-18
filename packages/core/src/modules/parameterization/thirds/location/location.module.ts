import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
@Module({
  imports: [HttpModule],
  providers: [LocationService, LocationResolver],
})
export class LocationModule {}
