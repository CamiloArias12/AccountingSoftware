import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { TypeAccountService } from '../type-account.service';
export declare class GroupService {
    private readonly groupRepository;
    private readonly typeAccountService;
    constructor(groupRepository: Repository<Group>, typeAccountService: TypeAccountService);
    create(createGroupDto: CreateGroupDto): Promise<Group>;
    findAll(): Promise<Group[]>;
    findOne(code: number): Promise<Group>;
    update(code: number, updateGroupDto: UpdateGroupDto): Promise<Group>;
    remove(code: number): Promise<void>;
}
