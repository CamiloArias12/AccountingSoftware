import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { TypeAccount } from '../type-account.entity';
import { TypeAccountService } from '../type-account.service';
import { ClassAccount } from '../class-account/class-account.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        private readonly typeAccountService: TypeAccountService,
        @InjectRepository(ClassAccount)
        private readonly classAccountRepository: Repository<ClassAccount>
    ) { }

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        const classAccount = await this.classAccountRepository.findOne({ where: { code: createGroupDto.classAccountCode } });

        if (!classAccount) {
            throw new NotFoundException(`ClassAccount con id ${createGroupDto.classAccountCode} no encontrado`);
        }

        const typeAccount: TypeAccount = await this.typeAccountService.create(createGroupDto);
        if (!typeAccount) {
            throw new NotFoundException(`No se pudo crear TypeAccount`);
        }

        const group: Group = new Group();
        group.typeAccount = typeAccount;
        group.classAccount = classAccount;

        return await this.groupRepository.save(group);
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

    async updateGroupAccount(code: number, updateData: UpdateGroupDto): Promise<Group> {
        if (this.findOne(code)) {
          const typeAccount: TypeAccount = new TypeAccount()
          console.log(typeAccount)
          return this.typeAccountService.update(code, typeAccount).then((typeAccount: TypeAccount) => {
            return this.findOne(typeAccount.code)
          })
    
        }
        return null
      }

}

