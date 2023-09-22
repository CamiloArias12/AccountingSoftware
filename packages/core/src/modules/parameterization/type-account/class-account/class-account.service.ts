import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassAccountDto } from './dto/createClassAccount.dto';
import { UpdateClassAccountDto } from './dto/updateClassAccount.dto';
import { ClassAccount } from './class-account.entity';
import { TypeAccountService } from '../type-account.service';
import { TypeAccount } from '../type-account.entity';

@Injectable()
export class ClassAccountService {
  constructor(
    @InjectRepository(ClassAccount)
    private readonly classAccountRepository: Repository<ClassAccount>,
    private readonly typeAccountService: TypeAccountService
  ) { }

  async create(createClassAccountDto: CreateClassAccountDto): Promise<ClassAccount> {

    const typeAccount: TypeAccount = await this.typeAccountService.create(createClassAccountDto)
    if (typeAccount) {
      const classAccount = new ClassAccount();
      classAccount.typeAccount = typeAccount
      return await this.classAccountRepository.save(classAccount);
    }
  }


  async findAll(): Promise<TypeAccount[]> {
    return await this.typeAccountService.findAll();
  }

  async findOne(code: number): Promise<ClassAccount> {
    const classAccount = await this.classAccountRepository.findOne({
      where: {
        code,
      },
    });
    if (!classAccount) {
      throw new NotFoundException(`ClassAccount with code ${code} not found`);
    }
    return classAccount;
  }

  async updateClassAccount(code: number, updateData: UpdateClassAccountDto): Promise<ClassAccount> {
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

