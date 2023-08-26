import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
export declare class GroupService {
    private readonly groupRepository;
    constructor(groupRepository: Repository<Group>);
    create(createGroupDto: CreateGroupDto): Promise<Group>;
    findAll(): Promise<Group[]>;
    findOne(code: number): Promise<Group>;
    update(code: number, updateGroupDto: UpdateGroupDto): Promise<Group>;
    remove(code: number): Promise<void>;
}
