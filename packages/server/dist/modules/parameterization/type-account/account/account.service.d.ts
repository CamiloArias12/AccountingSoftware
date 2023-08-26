import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
export declare class AccountService {
    private readonly accountRepository;
    constructor(accountRepository: Repository<Account>);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(): Promise<Account[]>;
    findOne(code: number): Promise<Account>;
    update(code: number, updateAccountDto: UpdateAccountDto): Promise<Account>;
    remove(code: number): Promise<void>;
}
