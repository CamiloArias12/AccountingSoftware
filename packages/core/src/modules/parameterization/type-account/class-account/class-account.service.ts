import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ClassAccount } from './class-account.entity';
import { TypeAccount } from '../type-account.entity';
import { NatureEnum } from '../dto/enum-type';
import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';
import { Auxiliary } from '../auxiliary/auxiliary.entity';
import { SubAccount } from '../sub-account/sub-account.entity';
import { Account } from '../account/account.entity';
import { Group } from '../group/group.entity';
import { ClassAccountStatistics } from '../dto/types';

@Injectable()
export class ClassAccountService {
  constructor(
    @InjectRepository(ClassAccount)
    private readonly classAccountRepository: Repository<ClassAccount>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    typeAccount: TypeAccount,
    queryRunner?: QueryRunner,
  ): Promise<ClassAccount> {
    const classAccount = new ClassAccount();
    classAccount.typeAccount = typeAccount;
    return await this.classAccountRepository.save(classAccount);
  }

  async findOne(code: number): Promise<ClassAccount> {
    return await this.classAccountRepository.findOne({
      where: {
        code,
      },
    });
  }

  async findAll(): Promise<ClassAccount[]> {
    return await this.classAccountRepository.find({
      relations: {
        typeAccount: true,
        groups: {
          typeAccount: true,
          accounts: {
            typeAccount: true,
            subAccounts: {
              typeAccount: true,
              auxiliaries: {
                typeAccount: true,
              },
            },
          },
        },
      },
    });
  }

  async getStatics(): Promise<ClassAccountStatistics[]> {
    return await this.dataSource
      .createQueryBuilder()
      .addSelect(
        ' SUM(CASE WHEN account_movement.nature = "Debito" THEN value ELSE 0 END) ',
        'debit_balance',
      )
      .addSelect(
        ' SUM(CASE WHEN account_movement.nature = "Credito" THEN value ELSE 0 END) ',
        'credit_balance',
      )
      .addSelect('type_account.code', 'code')
      .addSelect('type_account.name', 'name')
      .from(ClassAccount, 'class')

      .leftJoin(TypeAccount, 'type_account', 'class.code=type_account.code')
      .leftJoin(Group, 'group', 'class.code=group.classAccountCode')
      .leftJoin(Account, 'account', 'group.code= account.groupCode')
      .leftJoin(
        SubAccount,
        'sub_account',
        'account.code= sub_account.accountCode',
      )

      .leftJoin(
        Auxiliary,
        'auxiliary',
        'sub_account.code= auxiliary.subAccountCode',
      )
      .leftJoin(
        AccountMovement,
        'account_movement',
        'auxiliary.code = account_movement.idAccount',
      )

      .addGroupBy('class.code')
      .getRawMany();
  }
}
