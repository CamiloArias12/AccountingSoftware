import { Injectable } from '@nestjs/common';
import { CreateContributionInput } from './dto/create-contribution.input';
import { UpdateContributionInput } from './dto/update-contribution.input';
import { Contribution } from './contribution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CashRegisterMovement } from 'src/modules/treasury/cash-register-movement/cash-register-movement.entity';
import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';
import { ContributionSaving } from './dto/types';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(Contribution)
    private contributionRepository: Repository<Contribution>,

    private dataSource: DataSource,
  ) {}

  create(contribution: Contribution) {
    return this.contributionRepository.save(contribution);
  }

  async findBySaving(saving: number): Promise<ContributionSaving[]> {
    const query = await this.dataSource
      .createQueryBuilder()
      .addSelect('account_movement.value', 'value')
      .addSelect("CONCAT(contribution.year,'-',contribution.month)", 'date')
      .from(CashRegisterMovement, 'cash')

      .innerJoin(
        Contribution,
        'contribution',
        'cash.contributionCashId= contribution.id and contribution.savingContributionId= :saving',
      )
      .innerJoin(
        AccountMovement,
        'account_movement',
        'cash.id=account_movement.movementCashId',
      )
      .setParameters({ saving: saving })
      .distinct(true)
      .getRawMany();

    return query;
  }

  async statistics() {
    const query = await this.dataSource
      .createQueryBuilder()
      .addSelect('SUM(account_movement.value)', 'value')
      .addSelect('contribution.year', 'year')
      .addSelect('contribution.month', 'month')
      .from(CashRegisterMovement, 'cash')

      .innerJoin(
        Contribution,
        'contribution',
        'cash.contributionCashId= contribution.id',
      )
      .innerJoin(
        AccountMovement,
        'account_movement',
        'cash.id=account_movement.movementCashId',
      )
      .where("nature='Debito'")
      .distinct(true)
      .groupBy('year')
      .addGroupBy('month')
      .getRawMany();
    const values = [];
    query.map((data) => {
      values.push([
        new Date(data.year, data.month - 1, 1).getTime(),
        data.value,
      ]);
    });
    return values;
  }

  async findOne(options: FindOneOptions<Contribution>) {
    const query = await this.contributionRepository.findOne(options);
    console.log(query.cash);
    return query;
  }

  async exist(options: FindManyOptions<Contribution>) {
    return await this.contributionRepository.exist(options);
  }

  update(id: number, updateContributionInput: UpdateContributionInput) {
    return `This action updates a #${id} contribution`;
  }

  remove(id: number) {
    return `This action removes a #${id} contribution`;
  }
}
