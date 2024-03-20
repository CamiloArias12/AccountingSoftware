import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './group.entity';

@Resolver(() => Group)
export class GroupResolver {
    constructor(private readonly groupService: GroupService) { }

    @Query(() => [Group])
    async getGroupAll(): Promise<Group[]> {
        return await this.groupService.findAll();
    }

    @Query(() => Group)
    async getGroup(@Args('code') code: number): Promise<Group> {
        return await this.groupService.findOne(code);
    }

     @Query(() => [Group])
    async getGroupByClass(@Args('code') code: number): Promise<Group[]> {
        return await this.groupService.findByClass(code);
    }

}

