import { AccountService } from './account/account.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { ClassAccountService } from './class-account/class-account.service';
import { GroupService } from './group/group.service';
import { SubAccountService } from './sub-account/sub-account.service';
import { TypeAccount } from './type-account.entity';
import { Repository } from 'typeorm';
export declare class TypeAccountService {
    private readonly typeAccountRepository;
    private readonly accountService;
    private readonly auxiliaryService;
    private readonly classAccountService;
    private readonly groupService;
    private readonly subAccountService;
    constructor(typeAccountRepository: Repository<TypeAccount>, accountService: AccountService, auxiliaryService: AuxiliaryService, classAccountService: ClassAccountService, groupService: GroupService, subAccountService: SubAccountService);
    create(data: Partial<TypeAccount>): Promise<TypeAccount>;
    findAll(): Promise<TypeAccount[]>;
    findOne(code: number): Promise<TypeAccount>;
    update(code: number, data: Partial<TypeAccount>): Promise<TypeAccount>;
    remove(code: number): Promise<void>;
}
