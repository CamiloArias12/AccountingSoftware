import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';

@Resolver(() => Group)
export class GroupResolver {
    constructor(private readonly groupService: GroupService) { }

    @Mutation(returns => Group)
    async createGroup(@Args('input') createGroupDto: CreateGroupDto): Promise<Group> {
        return this.groupService.create(createGroupDto);
    }

    @Query(() => [Group])
    async allGroups(): Promise<Group[]> {
        return await this.groupService.findAll();
    }

    @Query(() => Group)
    async group(@Args('code') code: number): Promise<Group> {
        return await this.groupService.findOne(code);
    }

    
}

