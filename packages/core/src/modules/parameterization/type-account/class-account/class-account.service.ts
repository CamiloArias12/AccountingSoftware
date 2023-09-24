import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassAccount } from './class-account.entity';
import { TypeAccount } from '../type-account.entity';

@Injectable()
export class ClassAccountService {
  constructor(
    @InjectRepository(ClassAccount)
    private readonly classAccountRepository: Repository<ClassAccount>,
  ) { }

  async create(typeAccount:TypeAccount): Promise<ClassAccount> {
      const classAccount = new ClassAccount();
      classAccount.typeAccount = typeAccount
      return await this.classAccountRepository.save(classAccount);
  }


  async findOne(code: number): Promise<ClassAccount> {
    const classAccount = await this.classAccountRepository.findOne({
      where: {
        code,
      },
    });
    return classAccount;
  }


}

