import { Module } from '@nestjs/common';
import { SubAccountResolver } from './sub-account.resolver';

@Module({
  providers: [SubAccountResolver]
})
export class SubAccountModule {}
