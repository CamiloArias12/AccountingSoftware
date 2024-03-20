import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { UpdateTypeCreditInput } from './dto/updateTypeCredit.dto';
import { TypeCreditAccount } from './type-credit-account/type-credit-account.entity';
import { TypeAccountCreditEnum } from './dto/enum-types';
import { TypeCreditAccountService } from './type-credit-account/type-credit-account.service';

@Injectable()
export class TypeCreditService {
  constructor(
    @InjectRepository(TypeCredit)
    private readonly typeCreditRepository: Repository<TypeCredit>,
    private readonly auxiliaryService: AuxiliaryService,
    private readonly auxiliariesTypeCreditService: TypeCreditAccountService,
  ) {}

  async createTypeCredit(data: CreateTypeCreditDto): Promise<Boolean> {
    if (data.accounts && data.accounts.length >= 2) {
      try {
        let auxiliaries: TypeCreditAccount[] = [];
        const typeCredit = new TypeCredit();
        for (const account of data.accounts) {
          const typeCrediAccount: TypeCreditAccount = new TypeCreditAccount();
          const auxiliary = await this.auxiliaryService.findOne(
            account.account,
          );
          typeCrediAccount.account = auxiliary;
          typeCrediAccount.nature = account.nature;
          typeCrediAccount.typeAccount = TypeAccountCreditEnum.CAPITAL;
          auxiliaries.push(typeCrediAccount);
        }
        for (const account of data.accountsInterest) {
          const typeCrediAccount: TypeCreditAccount = new TypeCreditAccount();
          const auxiliary = await this.auxiliaryService.findOne(
            account.account,
          );
          typeCrediAccount.account = auxiliary;
          typeCrediAccount.nature = account.nature;
          typeCrediAccount.typeAccount = TypeAccountCreditEnum.INTEREST;
          auxiliaries.push(typeCrediAccount);
        }

        typeCredit.name = data.name;
        typeCredit.interest = data.interest;
        typeCredit.auxiliaries = auxiliaries;
        await this.typeCreditRepository.save(typeCredit);

        return true;
      } catch (e) {
        console.log(e);
      }
    } else {
      return false;
    }
  }

  async update(data: CreateTypeCreditDto, id: number): Promise<Boolean> {
    try {
      const typeCredit = await this.findOne(id);
      await this.auxiliariesTypeCreditService.delete(typeCredit.auxiliaries);

      let auxiliaries: TypeCreditAccount[] = [];
      for (const account of data.accounts) {
        const typeCrediAccount: TypeCreditAccount = new TypeCreditAccount();
        const auxiliary = await this.auxiliaryService.findOne(account.account);
        typeCrediAccount.account = auxiliary;
        typeCrediAccount.nature = account.nature;
        typeCrediAccount.typeAccount = TypeAccountCreditEnum.CAPITAL;
        auxiliaries.push(typeCrediAccount);
      }

      for (const account of data.accountsInterest) {
        const typeCrediAccount: TypeCreditAccount = new TypeCreditAccount();
        const auxiliary = await this.auxiliaryService.findOne(account.account);
        typeCrediAccount.account = auxiliary;
        typeCrediAccount.nature = account.nature;
        typeCrediAccount.typeAccount = TypeAccountCreditEnum.INTEREST;
        auxiliaries.push(typeCrediAccount);
      }
      typeCredit.name = data.name;
      typeCredit.interest = data.interest;
      typeCredit.auxiliaries = auxiliaries;
      await this.typeCreditRepository.save(typeCredit);

      return true;
    } catch (e) {
      return false;
    }
  }

  async findAll(): Promise<TypeCredit[]> {
    return await this.typeCreditRepository.find({ relations: {} });
  }
  async findOne(id: number): Promise<TypeCredit> {
    return await this.typeCreditRepository.findOne({
      where: { id: id },
      order: { auxiliaries: { nature: 'DESC' } },
      relations: {
        auxiliaries: {
          account: {
            typeAccount: true,
          },
        },
      },
    });
  }
  async delete(id: number): Promise<Boolean> {
    try {
      await this.typeCreditRepository.delete(id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
