import { AccountService } from './account.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    createAccount(input: CreateAccountDto): Promise<Account>;
    allAccounts(): Promise<Account[]>;
    account(code: number): Promise<Account>;
    updateAccount(code: number, input: UpdateAccountDto): Promise<Account>;
    deleteAccount(code: number): Promise<boolean>;
}
