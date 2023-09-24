import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './group.entity';

@Resolver(() => Group)
export class GroupResolver {
    constructor(private readonly groupService: GroupService) { }

    @Query(() => [Group])
    async allGroups(): Promise<Group[]> {
        return await this.groupService.findAll();
    }

    @Query(() => Group)
    async group(@Args('code') code: number): Promise<Group> {
        return await this.groupService.findOne(code);
    }

    
}

