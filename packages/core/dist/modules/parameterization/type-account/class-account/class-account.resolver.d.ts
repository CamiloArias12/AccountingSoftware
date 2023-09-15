import { ClassAccountService } from './class-account.service';
import { ClassAccount } from './class-account.entity';
import { CreateClassAccountDto } from './dto/createClassAccount.dto';
import { UpdateClassAccountDto } from './dto/updateClassAccount.dto';
export declare class ClassAccountResolver {
    private readonly classAccountService;
    constructor(classAccountService: ClassAccountService);
    createClassAccount(input: CreateClassAccountDto): Promise<ClassAccount>;
    allClassAccounts(): Promise<ClassAccount[]>;
    classAccount(code: number): Promise<ClassAccount>;
    updateClassAccount(code: number, input: UpdateClassAccountDto): Promise<ClassAccount>;
    deleteClassAccount(code: number): Promise<boolean>;
}
