import { Repository } from 'typeorm';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';
import { SubAccount } from './sub-account.entity';
export declare class SubAccountService {
    private readonly subAccountRepository;
    constructor(subAccountRepository: Repository<SubAccount>);
    create(createSubAccountDto: CreateSubAccountDto): Promise<SubAccount>;
    findAll(): Promise<SubAccount[]>;
    findOne(code: number): Promise<SubAccount>;
    update(code: number, updateSubAccountDto: UpdateSubAccountDto): Promise<SubAccount>;
    remove(code: number): Promise<void>;
}
