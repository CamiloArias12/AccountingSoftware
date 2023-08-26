import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { ClassAccountService } from './class-account/class-account.service';
import { GroupService } from './group/group.service';
import { SubAccountService } from './sub-account/sub-account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeAccount } from './type-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeAccountService {

  constructor(
    @InjectRepository(TypeAccount)
    private readonly typeAccountRepository: Repository<TypeAccount>,
    private readonly accountService: AccountService,
    private readonly auxiliaryService: AuxiliaryService,
    private readonly classAccountService: ClassAccountService,
    private readonly groupService: GroupService,
    private readonly subAccountService: SubAccountService
  ) { }

  async create(data: Partial<TypeAccount>): Promise<TypeAccount> {
    const typeAccount = this.typeAccountRepository.create(data);
    return await this.typeAccountRepository.save(typeAccount);
  }

  async findAll(): Promise<TypeAccount[]> {
    return await this.typeAccountRepository.find();
  }

  async findOne(code: number): Promise<TypeAccount> {
    const typeAccount = await this.typeAccountRepository.findOne({ where: { code } });
    if (!typeAccount) {
      throw new NotFoundException(`TypeAccount with code ${code} not found`);
    }
    return typeAccount;
  }

  async update(code: number, data: Partial<TypeAccount>): Promise<TypeAccount> {
    await this.findOne(code); // throws an error if not found
    await this.typeAccountRepository.update({ code }, data);
    return this.findOne(code);
  }

  async remove(code: number): Promise<void> {
    const typeAccount = await this.findOne(code); // throws an error if not found
    await this.typeAccountRepository.remove(typeAccount);
  }
}
