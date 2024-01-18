import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderResolver } from './provider.resolver';
import { Provider } from './provider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  providers: [ProviderResolver, ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
