import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { TypeAccount } from '../type-account.entity';
import { TypeAccountService } from '../type-account.service';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        private readonly typeAccountService: TypeAccountService
    ) { }

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        const typeAccount: TypeAccount = await this.typeAccountService.create(createGroupDto);
        if (typeAccount) {
            const group: Group = new Group();
            group.typeAccount = typeAccount;
            return await this.groupRepository.save(group);
        }
    }
    
    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async findOne(code: number): Promise<Group> {
        const group = await this.groupRepository.findOne({
            where: {
                code,
            },
        });
        if (!group) {
            throw new NotFoundException(`Group with code ${code} not found`);
        }
        return group;
    }

    async update(code: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
        const group = await this.groupRepository.preload({
            code: code,
            ...updateGroupDto,
        });
        if (!group) {
            throw new NotFoundException(`Group with code ${code} not found`);
        }
        return await this.groupRepository.save(group);
    }

    async remove(code: number): Promise<void> {
        const group = await this.findOne(code);
        await this.groupRepository.remove(group);
    }
}

