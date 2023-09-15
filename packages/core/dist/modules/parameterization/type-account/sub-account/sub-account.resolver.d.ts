import { SubAccountService } from './sub-account.service';
import { SubAccount } from './sub-account.entity';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';
export declare class SubAccountResolver {
    private readonly subAccountService;
    constructor(subAccountService: SubAccountService);
    createSubAccount(input: CreateSubAccountDto): Promise<SubAccount>;
    allSubAccounts(): Promise<SubAccount[]>;
    subAccount(code: number): Promise<SubAccount>;
    updateSubAccount(code: number, input: UpdateSubAccountDto): Promise<SubAccount>;
    deleteSubAccount(code: number): Promise<boolean>;
}
