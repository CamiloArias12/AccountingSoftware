import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeCreditAccount } from './type-credit-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeCreditAccountService {
  constructor(
    @InjectRepository(TypeCreditAccount)
    private readonly typeCreditAccountRepository: Repository<TypeCreditAccount>,
  ) {}

  async create(typeCreditAccount: TypeCreditAccount[]) {
    console.log('accunts', typeCreditAccount);
    return await this.typeCreditAccountRepository.save(typeCreditAccount);
  }

  async delete(accounts: TypeCreditAccount[]) {
    try {
      await this.typeCreditAccountRepository.remove(accounts);
      return true;
    } catch (e) {
      return false;
      /* handle error */
    }
  }
}
