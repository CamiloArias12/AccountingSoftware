import { Repository } from 'typeorm';
import { CreateClassAccountDto } from './dto/createClassAccount.dto';
import { UpdateClassAccountDto } from './dto/updateClassAccount.dto';
import { ClassAccount } from './class-account.entity';
import { TypeAccountService } from '../type-account.service';
export declare class ClassAccountService {
    private readonly classAccountRepository;
    private readonly typeAccountService;
    constructor(classAccountRepository: Repository<ClassAccount>, typeAccountService: TypeAccountService);
    create(createClassAccountDto: CreateClassAccountDto): Promise<ClassAccount>;
    findAll(): Promise<ClassAccount[]>;
    findOne(code: number): Promise<ClassAccount>;
    update(code: number, updateClassAccountDto: UpdateClassAccountDto): Promise<ClassAccount>;
    remove(code: number): Promise<void>;
}
