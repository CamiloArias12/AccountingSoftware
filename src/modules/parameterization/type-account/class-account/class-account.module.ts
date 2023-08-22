import { Module } from '@nestjs/common';
import { ClassAccountService } from './class-account.service';
import { ClassAccountResolver } from './class-account.resolver';

@Module({
  providers: [ClassAccountService, ClassAccountResolver]
})
export class ClassAccountModule {}
