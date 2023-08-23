import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';

@Resolver(() => Group)
export class GroupResolver {
    constructor(private readonly groupService: GroupService) { }

    @Mutation(() => Group)
    async createGroup(@Args('input') input: CreateGroupDto): Promise<Group> {
        return await this.groupService.create(input);
    }

    @Query(() => [Group])
    async allGroups(): Promise<Group[]> {
        return await this.groupService.findAll();
    }

    @Query(() => Group)
    async group(@Args('code') code: number): Promise<Group> {
        return await this.groupService.findOne(code);
    }

    @Mutation(() => Group)
    async updateGroup(
        @Args('code') code: number,
        @Args('input') input: UpdateGroupDto,
    ): Promise<Group> {
        return await this.groupService.update(code, input);
    }

    @Mutation(() => Boolean)
    async deleteGroup(@Args('code') code: number): Promise<boolean> {
        await this.groupService.remove(code);
        return true;
    }
}

