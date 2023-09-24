import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { TypeAccount } from '../type-account.entity';
import { ClassAccount } from '../class-account/class-account.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) { }
    async create(typeAccount:TypeAccount, classAccount:ClassAccount): Promise<Group> {
	    const account: Group= new Group();
	    account.typeAccount = typeAccount;
	    account.classAccount = classAccount;
	    
	    return await this.groupRepository.save(account);
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


}

