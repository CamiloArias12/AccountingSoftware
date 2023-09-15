import { ClassAccount } from './class-account/class-account.entity';
import { Account } from './account/account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';
import { Group } from './group/group.entity';
import { SubAccount } from './sub-account/sub-account.entity';
export declare class TypeAccount {
    code: number;
    name: string;
    nature: string;
    account: Account;
    auxiliary: Auxiliary;
    group: Group;
    classAccount: ClassAccount;
    subAccount: SubAccount;
}
