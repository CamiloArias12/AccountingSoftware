import { SubAccount } from "../sub-account/sub-account.entity";
import { Group } from "../group/group.entity";
import { TypeAccount } from "../type-account.entity";
export declare class Account {
    code: number;
    group: Group;
    subAccounts: SubAccount[];
    typeAccount: TypeAccount;
}
