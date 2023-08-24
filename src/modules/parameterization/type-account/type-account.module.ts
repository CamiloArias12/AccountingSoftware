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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassAccountService } from './class-account/class-account.service';
import { ClassAccountResolver } from './class-account/class-account.resolver';
import { GroupResolver } from './group/group.resolver';
import { AccountResolver } from './account/account.resolver';
import { AuxiliaryResolver } from './auxiliary/auxiliary.resolver';
import { TypeAccount } from './type-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature( [TypeAccount,ClassAccount, Group, SubAccount, Auxiliary, Account])],
  providers :[ClassAccountService,GroupService,AccountService,SubAccountService,AuxiliaryService,ClassAccountResolver,GroupResolver,AccountResolver,SubAccountService,AuxiliaryResolver,
	      TypeAccountService 
  ]
})
export class TypeAccountModule {}
