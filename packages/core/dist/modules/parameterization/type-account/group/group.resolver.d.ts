import { GroupService } from './group.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
export declare class GroupResolver {
    private readonly groupService;
    constructor(groupService: GroupService);
    createGroup(input: CreateGroupDto): Promise<Group>;
    allGroups(): Promise<Group[]>;
    group(code: number): Promise<Group>;
    updateGroup(code: number, input: UpdateGroupDto): Promise<Group>;
    deleteGroup(code: number): Promise<boolean>;
}
