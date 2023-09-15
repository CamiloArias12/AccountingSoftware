import { Repository } from 'typeorm';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';
import { SubAccount } from './sub-account.entity';
import { TypeAccountService } from '../type-account.service';
export declare class SubAccountService {
    private readonly subAccountRepository;
    private readonly typeAccountService;
    constructor(subAccountRepository: Repository<SubAccount>, typeAccountService: TypeAccountService);
    create(createSubAccountDto: CreateSubAccountDto): Promise<SubAccount>;
    findAll(): Promise<SubAccount[]>;
    findOne(code: number): Promise<SubAccount>;
    update(code: number, updateSubAccountDto: UpdateSubAccountDto): Promise<SubAccount>;
    remove(code: number): Promise<void>;
}
