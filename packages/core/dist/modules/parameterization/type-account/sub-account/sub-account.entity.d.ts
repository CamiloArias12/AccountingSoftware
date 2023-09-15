import { Auxiliary } from "../auxiliary/auxiliary.entity";
import { Account } from "../account/account.entity";
import { TypeAccount } from "../type-account.entity";
export declare class SubAccount {
    code: number;
    account: Account;
    auxiliaries: Auxiliary[];
    typeAccount: TypeAccount;
}
