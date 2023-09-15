import { Account } from "../account/account.entity";
import { ClassAccount } from "../class-account/class-account.entity";
import { TypeAccount } from "../type-account.entity";
export declare class Group {
    code: number;
    classAccount: ClassAccount;
    accounts: Account[];
    typeAccount: TypeAccount;
}
