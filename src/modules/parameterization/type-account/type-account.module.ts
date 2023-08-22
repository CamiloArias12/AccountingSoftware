import { Module } from '@nestjs/common';
import { ClassAccountModule } from './class-account/class-account.module';
import { DataAccountService } from './data-account/data-account.service';
import { DataAccountModule } from './data-account/data-account.module';
import { GroupModule } from './group/group.module';
import { SubAccountService } from './sub-account/sub-account.service';
import { SubAccountModule } from './sub-account/sub-account.module';
import { AuxiliaryResolver } from './auxiliary/auxiliary.resolver';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { AuxiliaryModule } from './auxiliary/auxiliary.module';
import { AccountResolver } from './account/account.resolver';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ClassAccountModule, DataAccountModule, GroupModule, SubAccountModule, AuxiliaryModule, AccountModule],
  providers: [DataAccountService, SubAccountService, AuxiliaryResolver, AuxiliaryService, AccountResolver]
})
export class TypeAccountModule {}
