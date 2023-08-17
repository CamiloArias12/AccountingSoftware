import { Module } from '@nestjs/common';
import { CompanyProviderService } from './company-provider.service';
import { CompanyProviderResolver } from './company-provider.resolver';

@Module({
  providers: [CompanyProviderService, CompanyProviderResolver]
})
export class CompanyProviderModule {}
