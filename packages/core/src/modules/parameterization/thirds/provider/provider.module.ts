import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Provider from './provider.entity';
import { ProviderService } from './provider.service';
import { ProviderResolver } from './provider.resolver';
@Module({                                 
   imports:[TypeOrmModule.forFeature([Provider])],
 
    providers: [ProviderResolver, ProviderService]
})
export class ProviderModule {}



