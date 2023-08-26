import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { TypeAccountService } from '../type-account.service';
export declare class AccountService {
    private readonly accountRepository;
    private readonly typeAccountService;
    constructor(accountRepository: Repository<Account>, typeAccountService: TypeAccountService);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(): Promise<Account[]>;
    findOne(code: number): Promise<Account>;
    update(code: number, updateAccountDto: UpdateAccountDto): Promise<Account>;
    remove(code: number): Promise<void>;
}
