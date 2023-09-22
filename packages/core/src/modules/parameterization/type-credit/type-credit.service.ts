import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { TypeAccountService } from '../type-account/type-account.service';
import { SubAccount } from '../type-account/sub-account/sub-account.entity';
import { SubAccountService } from '../type-account/sub-account/sub-account.service';
import { AccountService } from '../type-account/account/account.service';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { Auxiliary } from '../type-account/auxiliary/auxiliary.entity';
import { Account } from '../type-account/account/account.entity';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';


@Injectable()
export class TypeCreditService {
  constructor(
    @InjectRepository(TypeCredit)
    private readonly typeCreditRepository: Repository<TypeCredit>,
    private readonly subAccountService: SubAccountService,
    private readonly accountService: AccountService,
    private readonly auxiliaryService: AuxiliaryService
  ) { }

  async createTypeCredit(data: CreateTypeCreditDto): Promise<TypeCredit> {
    const typeCredit = new TypeCredit();

    if (data.subAccount && data.subAccount.length) {
      typeCredit.subAccounts = await this.subAccountService.findSubAccount(data.subAccount);
    }

    if (data.account && data.account.length) {
      typeCredit.accounts = await this.accountService.findAccount(data.account);
    }

    if (data.auxiliary && data.auxiliary.length) {
      typeCredit.auxiliarys = await this.auxiliaryService.findAuxiliary(data.auxiliary);
    }

    typeCredit.idTypeCredit = data.idTypeCredit;
    typeCredit.nombre = data.nombre;

    return await this.typeCreditRepository.save(typeCredit);
  }

  async updateOrCreateTypeCredit(data: UpdateTypeCreditDto): Promise<TypeCredit> {
    let typeCredit = await this.typeCreditRepository.findOne({
      where: { idTypeCredit: data.idTypeCredit }
    });

    if (!typeCredit) {
      typeCredit = new TypeCredit();
      typeCredit.idTypeCredit = data.idTypeCredit;
    }

    if (data.subAccount && data.subAccount.length) {
      typeCredit.subAccounts = await this.subAccountService.findSubAccount(data.subAccount);
    }

    if (data.account && data.account.length) {
      typeCredit.accounts = await this.accountService.findAccount(data.account);
    }

    if (data.auxiliary && data.auxiliary.length) {
      typeCredit.auxiliarys = await this.auxiliaryService.findAuxiliary(data.auxiliary);
    }

    typeCredit.nombre = data.nombre;

    return await this.typeCreditRepository.save(typeCredit);
  }


}



