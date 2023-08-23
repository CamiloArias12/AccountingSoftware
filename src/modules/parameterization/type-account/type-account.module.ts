import { Module } from '@nestjs/common';
import { SubAccountService } from './sub-account/sub-account.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { ClassAccount } from './class-account/class-account.entity';
import { Group } from './group/group.entity';
import { SubAccount } from './sub-account/sub-account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';
import { Account } from './account/account.entity';
import { TypeAccountService } from './type-account.service';
import { AccountService } from './account/account.service';
import { GroupService } from './group/group.service';

@Module({
  imports: [ClassAccount, Group, SubAccount, Auxiliary, Account],
  providers: [SubAccountService, AuxiliaryService, AuxiliaryService, AccountService, GroupService, TypeAccountService]
})
export class TypeAccountModule {}
