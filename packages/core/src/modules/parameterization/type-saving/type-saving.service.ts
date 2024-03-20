import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { TypeSavingAccount } from './type-saving-account/type-saving-account.entity';
import { TypeSavingAccountService } from './type-saving-account/type-saving-account.service';

@Injectable()
export class TypeSavingService {
  constructor(
    @InjectRepository(TypeSaving)
    private readonly typeSavingRepository: Repository<TypeSaving>,
    private readonly auxiliaryService: AuxiliaryService,
    private readonly typeSavingAccountService: TypeSavingAccountService,
  ) {}

  async create(data: CreateTypeSavingDto): Promise<TypeSaving> {
    const typeSaving = new TypeSaving();
    let auxiliaries: TypeSavingAccount[] = [];
    for (const account of data.accounts) {
      const typeSavingAccount: TypeSavingAccount = new TypeSavingAccount();
      const auxiliary = await this.auxiliaryService.findOne(account.account);
      typeSavingAccount.account = auxiliary;
      typeSavingAccount.nature = account.nature;
      typeSavingAccount.percentage = account.percentage;

      auxiliaries.push(typeSavingAccount);
    }
    typeSaving.name = data.name;

    typeSaving.auxiliaries = auxiliaries;

    return await this.typeSavingRepository.save(typeSaving);
  }

  async update(data: CreateTypeSavingDto, id: number): Promise<Boolean> {
    const typeSaving = await this.findOne(id);
    await this.typeSavingAccountService.delete(typeSaving.auxiliaries);
    let auxiliaries: TypeSavingAccount[] = [];
    for (const account of data.accounts) {
      const typeSavingAccount: TypeSavingAccount = new TypeSavingAccount();
      const auxiliary = await this.auxiliaryService.findOne(account.account);
      typeSavingAccount.account = auxiliary;
      typeSavingAccount.nature = account.nature;
      typeSavingAccount.percentage = account.percentage;

      auxiliaries.push(typeSavingAccount);
    }
    typeSaving.name = data.name;
    typeSaving.auxiliaries = auxiliaries;
    try {
      await this.typeSavingRepository.save(typeSaving);
      return true;
    } catch (e) {
      return false;
      /* handle error */
    }
  }

  async findOne(id: number): Promise<TypeSaving> {
    return await this.typeSavingRepository.findOne({
      where: { id: id },
      relations: {
        auxiliaries: {
          account: {
            typeAccount: true,
          },
        },
      },
      order: { auxiliaries: { nature: 'DESC' } },
    });
  }

  async findAll(): Promise<TypeSaving[]> {
    return await this.typeSavingRepository.find({
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
      await this.typeSavingRepository.delete(id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
