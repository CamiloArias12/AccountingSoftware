import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeSavingAccount } from './type-saving-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeSavingAccountService {
  constructor(
    @InjectRepository(TypeSavingAccount)
    private readonly typeSavingAccountRepository: Repository<TypeSavingAccount>,
  ) {}

  async create(typeSavingAccount: TypeSavingAccount[]) {
    console.log('accunts', typeSavingAccount);
    return await this.typeSavingAccountRepository.save(typeSavingAccount);
  }
  async delete(accounts: TypeSavingAccount[]) {
    try {
      await this.typeSavingAccountRepository.remove(accounts);
      return true;
    } catch (e) {
      return false;
      /* handle error */
    }
  }
}
