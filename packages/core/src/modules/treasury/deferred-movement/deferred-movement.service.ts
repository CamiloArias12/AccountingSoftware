import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { InstallmentsService } from 'src/modules/wallet/credit/installments/installments.service';
import { TypeAccountCreditEnum } from 'src/modules/parameterization/type-credit/dto/enum-types';
import { DeferredMovement } from './deferred-movement.entity';
import { Installment } from 'src/modules/wallet/credit/installments/installment.entity';
import { PaymentInstallmentInput } from '../cash-register-movement/dto/types';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import { StateInstallment } from 'src/modules/wallet/credit/installments/dto/enum-types';
import { ViewSaving } from 'src/modules/wallet/saving/saving-view.entity';
import { Contribution } from 'src/modules/wallet/contribution/contribution.entity';
import { SavingPayment } from 'src/modules/wallet/saving/dto/types';
import { SavingService } from 'src/modules/wallet/saving/saving.service';
import { ContributionService } from 'src/modules/wallet/contribution/contribution.service';
import { CashRegisterMovementService } from '../cash-register-movement/cash-register-movement.service';
import { CreditPaymentOut, SavingOut } from './dto/types';
import { CashRegisterMovement } from '../cash-register-movement/cash-register-movement.entity';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { InputSearchMovement } from '../movement/dto/types';
import { InstallmentPayment } from 'src/modules/wallet/credit/installments/dto/types';
@Injectable()
export class DeferredMovementService {
  constructor(
    @InjectRepository(DeferredMovement)
    private readonly movementDeferredRepository: Repository<DeferredMovement>,
    private readonly installmentService: InstallmentsService,
    private readonly savingService: SavingService,
    private readonly contributionService: ContributionService,
    private readonly cashService: CashRegisterMovementService,
    private dataSource: DataSource,
  ) {}

  async findByMovement(movement: string) {
    if (
      await this.contributionService.exist({
        where: { movement_deferred: { movement: { id: movement } } },
        relations: { movement_deferred: { movement: true } },
      })
    ) {
      return await this.findByMovementSaving(movement);
    } else {
      return await this.findByMovementCredit(movement);
    }
  }

  async findByMovementCredit(movement: string): Promise<CreditPaymentOut[]> {
    return await this.dataSource
      .createQueryBuilder()
      .addSelect('view_credit.identification', 'identification')
      .addSelect('view_credit.name ', 'name')
      .addSelect('view_credit.lastName', 'lastName')
      .addSelect('view_credit.nameCredit', 'typeCredit')
      .addSelect('installments.paymentDate', 'paymentDate')
      .addSelect('view_credit.interest', 'interest')
      .addSelect('installments.installmentNumber', 'installmentNumber')
      .addSelect('installments.scheduledPayment', 'scheduledPayment')
      .addSelect('installments.id_credit', 'credit')
      .addSelect('installments.extraPayment', 'extraPayment')
      .addSelect('installments.totalPayment', 'totalPayment')
      .addSelect('installments.capital', 'capital')
      .addSelect('installments.interest', 'interestPayment')
      .from(DeferredMovement, 'deferred_movement')
      .leftJoin(
        Installment,
        'installments',
        '(deferred_movement.installmentDeferredInstallmentNumber =installments.installmentNumber AND deferred_movement.installmentDeferredIdCredit=installments.id_credit)',
      )
      .leftJoin(
        ViewCredit,
        'view_credit',
        'installments.id_credit=view_credit.id',
      )

      .where('deferred_movement.movementId= :movement', { movement: movement })

      .getRawMany();
  }

  async findByMovementSaving(movement: string): Promise<SavingOut[]> {
    return await this.dataSource
      .createQueryBuilder()
      .addSelect('saving.identification', 'identification')
      .addSelect('saving.id', 'saving')
      .addSelect('saving.name', 'name')
      .addSelect('saving.lastName', 'lastName')
      .addSelect('saving.qoutaValue', 'qoutaValue')
      .addSelect('contribution.month', 'month')
      .addSelect('contribution.year', 'year')
      .from(ViewSaving, 'saving')
      .innerJoin(
        Contribution,
        'contribution',
        'saving.id=contribution.savingContributionId',
      )
      .innerJoin(
        DeferredMovement,
        'deferred_movement',
        'contribution.id=deferred_movement.contributionDeferredId',
      )
      .where('deferred_movement.movementId= :movement', { movement: movement })
      .getRawMany();
  }

  async find(data: InputSearchMovement) {
    return await this.dataSource
      .createQueryBuilder()
      .addSelect('movement.id', 'id')
      .addSelect('movement.date', 'date')
      .addSelect('movement.concept', 'concept')
      .from(Movement, 'movement')
      .distinct(true)
      .innerJoin(
        DeferredMovement,
        'deferred_movement',
        'movement.id=deferred_movement.movementId',
      )
      .leftJoin(
        AccountMovement,
        'account_movement',
        'deferred_movement.id = account_movement.movementDefferedId',
      )
      .where(
        `movement.date>= :startDate and  movement.date<= :endDate 
    ${data.user ? 'and account_movement.userIdentification = :user' : ''}
    ${
      data.company
        ? 'and account_movement.companyIdentification = :company'
        : ''
    }
    ${data.idAccount ? 'and account_movement.auxiliaryCode = :idAccount' : ''}
    ${data.concept ? 'and movement.concept LIKE :concept ' : ''}
    ${data.name ? 'and movement.id LIKE :name ' : ''}

      `,
        {
          endDate: data.endDate.toISOString().split('T', 1),
          company: data.company,
          user: data.user,
          idAccount: data.idAccount,
          concept: `%${data?.concept}%`,

          name: `%${data?.name?.toUpperCase()}%`,
          startDate: data.startDate.toISOString().split('T', 1),
        },
      )
      .getRawMany();
  }

  async findOne(
    id_credit: number,
    installmentNumber: number,
  ): Promise<DeferredMovement> {
    return await this.dataSource
      .getRepository(DeferredMovement)
      .createQueryBuilder('deferred_movement')
      .where(
        'deferred_movement.installmentDeferredInstallmentNumber= :installmentNumber',
        { installmentNumber: installmentNumber },
      )
      .andWhere('deferred_movement.installmentDeferredIdCredit= :id_credit', {
        id_credit: id_credit,
      })

      .getOne();
  }

  async findAllIsntallmentPaymentInterest(startDate: Date, endDate: Date) {
    const query = this.dataSource
      .createQueryBuilder()
      .select('credit.id', 'credit')
      .addSelect('credit.identification', 'identification')
      .addSelect('credit.name ', 'name')
      .addSelect('credit.lastName', 'lastName')
      .addSelect('credit.name', 'typeCredit')
      .addSelect('installments.paymentDate', 'paymentDate')
      .addSelect('installments.finalBalance', 'finalBalance')
      .addSelect('credit.interest', 'interest')
      .addSelect('installments.installmentNumber', 'installmentNumber')
      .addSelect('installments.scheduledPayment', 'scheduledPayment')
      .addSelect('installments.extraPayment', 'extraPayment')
      .addSelect('installments.totalPayment', 'totalPayment')
      .addSelect('installments.capital', 'capital')
      .addSelect('installments.interest', 'interestPayment')
      .from(ViewCredit, 'credit')
      .leftJoin(Installment, 'installments', 'credit.id=installments.id_credit')
      .leftJoin(
        DeferredMovement,
        'installment_movement',
        '(installments.installmentNumber=installment_movement.installmentDeferredInstallmentNumber AND installments.id_credit=installment_movement.installmentDeferredIdCredit)',
      )
      .where('installments.paymentDate>= :startDate', {
        startDate: startDate.toISOString().split('T', 1),
      })
      .andWhere('installments.paymentDate<= :endDate', {
        endDate: endDate.toISOString().split('T', 1),
      })

      .andWhere('installments.state= :stateInstallment', {
        stateInstallment: StateInstallment.PENDIENTE,
      })
      .andWhere('credit.state IN (:...states)', {
        states: [StateCredit.DESEMBOLSADO, StateCredit.CURSO, StateCredit.MORA],
      })
      .andWhere(
        'installment_movement.installmentDeferredInstallmentNumber IS NULL',
      )
      .andWhere('installment_movement.installmentDeferredIdCredit IS NULL');
    const response: InstallmentPayment[] = await query.getRawMany();
    const installments: InstallmentPayment[] = [];
    for await (const installment of response) {
      if (await this.includeCredit(installments, installment.credit)) {
        installments.push(
          await this.minInstallment(response, installment.credit, installment),
        );
      }
    }
    return installments;
  }

  async includeCredit(installments: InstallmentPayment[], credit: number) {
    for await (const installment of installments) {
      if (installment.credit === credit) {
        return false;
      }
    }
    return true;
  }

  async minInstallment(
    installments: InstallmentPayment[],
    credit: number,
    installment: InstallmentPayment,
  ) {
    let installment_min = installment;

    for await (const installment of installments) {
      if (
        installment_min.credit > installment.credit &&
        credit === installment.credit
      ) {
        installment_min = installment;
      }
    }
    return installment_min;
  }

  async findAllSavingDeffered(date: Date) {
    console.log(date);
    const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(defaultTimeZone);
    const query = this.dataSource
      .getRepository(ViewSaving)
      .createQueryBuilder('saving')
      .leftJoin(
        Contribution,
        'contribution',
        'saving.id=contribution.savingContributionId and contribution.month=:month and  contribution.year= :year',
      )
      .where('contribution.id IS NULL')

      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(Contribution, 'contribution_b')
          .innerJoin(
            CashRegisterMovement,
            'cash',
            'contribution_b.id=cash.contributionCashId',
          )

          .where('contribution_b.month= :month_previus')
          .andWhere('contribution_b.year= :year_previus')
          .andWhere('contribution_b.savingContributionId= saving.id')
          .getQuery();
        return 'EXISTS ' + subQuery;
      })
      .setParameters({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        month_previus: date.getMonth() + 1 === 1 ? 12 : date.getMonth(),
        year_previus:
          date.getMonth() + 1 === 1
            ? date.getFullYear() - 1
            : date.getFullYear(),
      });

    const query_b = this.dataSource
      .getRepository(ViewSaving)
      .createQueryBuilder('saving')
      .leftJoin(
        Contribution,
        'contribution',
        'saving.id=contribution.savingContributionId',
      )
      .where('contribution.id IS NULL')
      .andWhere(
        'MONTH(saving.startDate)= :month and YEAR(saving.startDate) = :year',
      )
      .setParameters({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    console.log(query.getQueryAndParameters(), query_b.getQueryAndParameters());
    try {
      const [response_a, response_b] = await Promise.all([
        query.getMany(),
        query_b.getMany(),
      ]);
      return response_a.concat(response_b);
    } catch (e) {
      /* handle error */
    }
  }

  async delete(deferreds: DeferredMovement[]) {
    if (deferreds[0].installment_deferred) {
      for await (const deferred of deferreds) {
        if (
          await this.cashService.exist({
            where: {
              installment_cash: {
                id_credit: deferred.installment_deferred.id_credit,
                installmentNumber:
                  deferred.installment_deferred.installmentNumber,
              },
            },
            relations: { installment_cash: true },
          })
        ) {
          return { state: false, message: 'No se puede eliminar el diferido' };
        }
      }
    }
    if (deferreds[0].contribution_deferred) {
      const response = await Promise.all(
        deferreds.map(async (deferred) => {
          return await this.contributionService.findOne({
            where: {
              id: deferred.contribution_deferred.id,
            },
            relations: { movement_cash: true },
          });
        }),
      );
      console.log(response);
      for await (const deferred of response) {
        if (deferred.movement_cash) {
          return { state: false, message: 'No se puede eliminar el diferido' };
        }
      }
      const responseB = await Promise.all(
        response.map(async (deferred) => {
          return await this.contributionService.exist({
            where: {
              savingContributionId: deferred.savingContributionId,
              month: deferred.month === 12 ? 1 : deferred.month + 1,
              year: deferred.month === 12 ? deferred.year + 1 : deferred.year,
            },
          });
        }),
      );
      for await (const deferred of responseB) {
        if (deferred) {
          return { state: false, message: 'No se puede eliminar el diferido' };
        }
      }
    }

    try {
      await this.movementDeferredRepository.remove(deferreds);

      return null;
    } catch (e) {
      return { state: false, message: '' };
    }
  }

  async createDeferredInterestPayment(
    data: PaymentInstallmentInput,
  ): Promise<ResponseGraphql> {
    try {
      const movement: Movement = new Movement();
      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      const installmentsMovements: DeferredMovement[] = [];
      movement.id = `DIFERIDO_${movement_id}`;
      movement.date = data.date;
      movement.concept = data.concept;
      for (const credit of data.installments) {
        for (const installment of credit.installments) {
          const accountsMovements: AccountMovement[] = [];
          const installmentQuery =
            await this.installmentService.finOneByCreditAndNumberInstallment({
              where: {
                id_credit: credit.credit,
                installmentNumber: installment,
              },
              relations: {
                movement_deferred: true,
                credit: {
                  typeCredit: {
                    auxiliaries: {
                      account: true,
                    },
                  },
                  affiliate: {
                    user: true,
                  },
                },
              },
            });
          const installmentMovement: DeferredMovement = new DeferredMovement();
          for (const account of installmentQuery.credit.typeCredit
            .auxiliaries) {
            if (account.typeAccount === TypeAccountCreditEnum.INTEREST) {
              const accuntMovement: AccountMovement = new AccountMovement();
              accuntMovement.nature = account.nature;
              accuntMovement.auxiliary = account.account;
              accuntMovement.value = installmentQuery.interest;
              accuntMovement.user = installmentQuery.credit.affiliate.user;
              accountsMovements.push(accuntMovement);
            }
          }
          installmentMovement.movement = movement;
          installmentMovement.group_id = movement_id;
          installmentMovement.installment_deferred = installmentQuery;
          installmentMovement.account_movement = accountsMovements;

          installmentsMovements.push(installmentMovement);
        }
      }
      await this.movementDeferredRepository.save(installmentsMovements);
      return { state: true, message: 'Se ha creado el diferido' };
    } catch (e) {
      return { state: false, message: 'Error al crear el diferido' };
    }
  }
  async createDeferredSaving(data: SavingPayment): Promise<ResponseGraphql> {
    console.log(data.datePayment);
    try {
      const response = await this.findAllSavingDeffered(data.datePayment);
      let flag = false;
      console.log(response);
      for await (const saving of data.savings) {
        for await (const resposeSaving of response) {
          flag = false;
          if (resposeSaving.id === saving) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          return {
            message: `No se puede registrar el ahorro ${saving}`,
            state: false,
          };
        }
      }

      const movement: Movement = new Movement();
      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      const savingsMovements: DeferredMovement[] = [];
      movement.id = `DIFERIDO_${movement_id}`;
      movement.date = data.dateMovement;
      movement.concept = data.concept;
      for (const saving of data.savings) {
        const accountsMovements: AccountMovement[] = [];
        const savingQuery = await this.savingService.findOneSaving(saving);
        const savingDefferred: DeferredMovement = new DeferredMovement();
        console.log(savingQuery);
        const contribution: Contribution = new Contribution();
        contribution.month = data.datePayment.getMonth() + 1;
        contribution.year = data.datePayment.getFullYear();
        contribution.saving_contribution = savingQuery;

        for (const account of savingQuery.typeSaving.auxiliaries) {
          const accuntMovement: AccountMovement = new AccountMovement();
          accuntMovement.nature = account.nature;
          accuntMovement.auxiliary = account.account;
          accuntMovement.value =
            savingQuery.qoutaValue * (account.percentage / 100);
          accuntMovement.user = savingQuery.affiliate.user;

          accountsMovements.push(accuntMovement);
        }
        savingDefferred.movement = movement;
        savingDefferred.group_id = movement_id;
        savingDefferred.contribution_deferred =
          await this.contributionService.create(contribution);
        savingDefferred.account_movement = accountsMovements;

        savingsMovements.push(savingDefferred);
      }
      await this.movementDeferredRepository.save(savingsMovements);
      return { state: true, message: 'Se ha creado el diferido' };
    } catch (e) {
      console.log(e);
      return { state: false, message: 'No se ha creado el diferido' };
    }
  }

  async findMaxGroup() {
    return this.dataSource
      .createQueryBuilder()
      .select(`MAX(disbursementMovement.group_id)`, 'max')
      .from(DeferredMovement, 'disbursementMovement')
      .getRawOne();
  }
}
