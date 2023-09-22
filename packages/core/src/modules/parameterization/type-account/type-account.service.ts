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

  async update(code: number, typeAccountData: TypeAccount): Promise<TypeAccount> {

    return await this.typeAccountRepository.update({
      code: code
    }, { code: typeAccountData.code, name: typeAccountData.name, nature: typeAccountData.nature }).then((data) => {
      if (data.affected != 0)
        return this.findOne(typeAccountData.code);
    })
  }

}
