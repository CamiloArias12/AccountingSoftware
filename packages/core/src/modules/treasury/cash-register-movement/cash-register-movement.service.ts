import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { CashPaymentCredit, PaymentInstallmentInput } from './dto/types';
import { CreditService } from 'src/modules/wallet/credit/credit.service';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { CompanyService } from 'src/modules/parameterization/thirds/company/company.service';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import { UserService } from 'src/modules/parameterization/thirds/user/user.service';
import { TypeAccountCreditEnum } from 'src/modules/parameterization/type-credit/dto/enum-types';
import { AuxiliaryService } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.service';
import { InstallmentsService } from 'src/modules/wallet/credit/installments/installments.service';
import { StateInstallment } from 'src/modules/wallet/credit/installments/dto/enum-types';
import { CashRegisterMovement } from './cash-register-movement.entity';
import { Installment } from 'src/modules/wallet/credit/installments/installment.entity';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';
import { DeferredMovement } from '../deferred-movement/deferred-movement.entity';
import { InstallmentPayment } from 'src/modules/wallet/credit/installments/dto/types';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { ViewSaving } from 'src/modules/wallet/saving/saving-view.entity';
import { Contribution } from 'src/modules/wallet/contribution/contribution.entity';
import { SavingPayment } from 'src/modules/wallet/saving/dto/types';
import { SavingService } from 'src/modules/wallet/saving/saving.service';
import { ContributionService } from 'src/modules/wallet/contribution/contribution.service';
import { MovementOutput, SavingOut } from '../deferred-movement/dto/types';
import { NotePayment } from '../note-movement/dto/types';
import { NoteMovementService } from '../note-movement/note-movement.service';
import { InputSearchMovement } from '../movement/dto/types';
@Injectable()
export class CashRegisterMovementService {
  constructor(
    @InjectRepository(CashRegisterMovement)
    private readonly movementCashRegisterRepository: Repository<CashRegisterMovement>,
    @Inject(forwardRef(() => CreditService))
    private readonly creditService: CreditService,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly accountService: AuxiliaryService,
    private readonly installmentService: InstallmentsService,
    private readonly savingService: SavingService,
    private dataSource: DataSource,
    private readonly contributionService: ContributionService,
    private readonly noteService: NoteMovementService,
  ) {}

  async findMovementById(id: string): Promise<CashRegisterMovement[]> {
    return await this.movementCashRegisterRepository.find({
      where: { movementId: id },
      relations: { note_cash: true, installment_cash: true },
    });
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
        CashRegisterMovement,
        'cash_movement',
        'movement.id=cash_movement.movementId',
      )
      .leftJoin(
        AccountMovement,
        'account_movement',
        'cash_movement.id = account_movement.movementCashId',
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

  async exist(options: FindManyOptions<CashRegisterMovement>) {
    return await this.movementCashRegisterRepository.exist(options);
  }
  async findByMovement(movement: string) {
    if (
      await this.contributionService.exist({
        where: { movement_cash: { movement: { id: movement } } },
        relations: { movement_cash: { movement: true, note_cash: true } },
      })
    ) {
      return await this.findByMovementSaving(movement);
    } else {
      const query = await this.findMovementById(movement);
      if (query.length > 0) {
        if (query[0].noteCashId) {
          return await this.noteService.findByMovementNote(
            query[0].note_cash.movementId,
            true,
          );
        } else {
          return await this.findByMovementCredit(movement);
        }
      }
    }
  }

  async findByMovementCredit(movement: string): Promise<CashPaymentCredit[]> {
    const query = await this.dataSource
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
      .addSelect('deferred_movement.movementId', 'isDeferred')
      .from(CashRegisterMovement, 'cash_movement')
      .leftJoin(
        Installment,
        'installments',
        '(cash_movement.installmentCashInstallmentNumber =installments.installmentNumber AND cash_movement.installmentCashIdCredit=installments.id_credit)',
      )
      .leftJoin(
        DeferredMovement,
        'deferred_movement',
        '( installments.installmentNumber=deferred_movement.installmentDeferredInstallmentNumber AND installments.id_credit=deferred_movement.installmentDeferredIdCredit)',
      )

      .leftJoin(
        ViewCredit,
        'view_credit',
        'installments.id_credit=view_credit.id',
      )

      .where('cash_movement.movementId= :movement', { movement: movement })

      .getRawMany();

    return query;
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
        CashRegisterMovement,
        'cash_movement',
        'contribution.id=cash_movement.contributionCashId',
      )
      .where('cash_movement.movementId= :movement', { movement: movement })
      .getRawMany();
  }

  async findAllIsntallmentPayment(startDate: Date, endDate: Date) {
    const query: InstallmentPayment[] = await this.dataSource
      .createQueryBuilder()
      .addSelect('user.identification', 'identification')
      .addSelect('user.name ', 'name')
      .addSelect('user.lastName', 'lastName')
      .addSelect('typeCredit.name', 'typeCredit')
      .addSelect('installments.paymentDate', 'paymentDate')
      .addSelect('installments.finalBalance', 'finalBalance')
      .addSelect('credit.interest', 'interest')
      .addSelect('installments.installmentNumber', 'installmentNumber')
      .addSelect('installments.scheduledPayment', 'scheduledPayment')
      .addSelect('installments.id_credit', 'credit')
      .addSelect('installments.extraPayment', 'extraPayment')
      .addSelect('installments.totalPayment', 'totalPayment')
      .addSelect('installments.capital', 'capital')
      .addSelect('installments.interest', 'interestPayment')
      .addSelect('deferred_movement.movementId', 'movement_id')
      .from(Installment, 'installments')
      .leftJoin(Credit, 'credit', 'installments.id_credit=credit.id')
      .leftJoin(
        Affiliate,
        'affiliate',
        'credit.affiliateIdentification= affiliate.identification',
      )
      .leftJoin(
        DeferredMovement,
        'deferred_movement',
        '( installments.installmentNumber=deferred_movement.installmentDeferredInstallmentNumber AND installments.id_credit=deferred_movement.installmentDeferredIdCredit)',
      )

      .leftJoin(User, 'user', 'affiliate.identification= user.identification')
      .leftJoin(TypeCredit, 'typeCredit', 'credit.typeCreditId=typeCredit.id ')

      .where('installments.state= :stateInstallment', {
        stateInstallment: StateInstallment.PENDIENTE,
      })
      .andWhere('installments.paymentDate>= :startDate', {
        startDate: startDate.toISOString().split('T', 1),
      })
      .andWhere('installments.paymentDate<= :endDate', {
        endDate: endDate.toISOString().split('T', 1),
      })

      .andWhere('credit.state IN (:...states)', {
        states: [StateCredit.DESEMBOLSADO, StateCredit.CURSO, StateCredit.MORA],
      })

      .distinct(true)
      .getRawMany();

    return query;
  }

  async createInstallmentPayment(data: PaymentInstallmentInput) {
    for await (const installment of data.installments) {
      const sortedInstallments = installment.installments.sort((a, b) => a - b);
      if (sortedInstallments.length > 1) {
        const isPayment = this.isPayment(sortedInstallments);
        if (isPayment !== 0) {
          return false;
        }
      }
      const queryInstallment =
        await this.installmentService.finOneByCreditAndNumberInstallment({
          where: {
            id_credit: installment.credit,
            installmentNumber: sortedInstallments[0],
          },
        });
      if (queryInstallment.state === StateInstallment.PENDIENTE) {
        if (sortedInstallments[0] !== 1) {
          const installmentQuery =
            await this.installmentService.finOneByCreditAndNumberInstallment({
              where: {
                id_credit: installment.credit,
                installmentNumber: sortedInstallments[0] - 1,
              },
            });

          if (
            installmentQuery.state === StateInstallment.PENDIENTE ||
            installmentQuery.state === StateInstallment.MORA
          ) {
            return false;
          }
        }
      } else {
        return false;
      }
    }

    const max = await this.findMaxGroup();
    const movement_id = max.max ? max.max + 1 : 1;
    const movement: Movement = new Movement();
    const cashMovements: CashRegisterMovement[] = [];
    const accountsMovements: AccountMovement[] = [];

    movement.id = `RECI_CAJA_${movement_id}`;
    movement.date = data.date;
    movement.concept = data.concept;
    for (const credit of data.installments) {
      for (const installment of credit.installments) {
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
        const cashMovement: CashRegisterMovement = new CashRegisterMovement();
        for (const account of installmentQuery.credit.typeCredit.auxiliaries) {
          if (
            account.nature === NatureEnum.DEBIT &&
            account.typeAccount === TypeAccountCreditEnum.CAPITAL
          ) {
            const accuntMovement: AccountMovement = new AccountMovement();
            accuntMovement.nature = NatureEnum.CREDIT;
            accuntMovement.auxiliary = account.account;
            accuntMovement.value = installmentQuery.capital;
            accuntMovement.user = installmentQuery.credit.affiliate.user;

            accountsMovements.push(accuntMovement);
          }

          if (
            account.nature === NatureEnum.DEBIT &&
            account.typeAccount === TypeAccountCreditEnum.INTEREST
          ) {
            if (installmentQuery.movement_deferred) {
              const accuntMovement: AccountMovement = new AccountMovement();
              accuntMovement.nature = NatureEnum.CREDIT;
              accuntMovement.auxiliary = account.account;
              accuntMovement.value = installmentQuery.interest;
              accuntMovement.user = installmentQuery.credit.affiliate.user;
              accountsMovements.push(accuntMovement);
            }
          }
        }

        const accuntMovement: AccountMovement = new AccountMovement();
        accuntMovement.value = installmentQuery.capital;
        accuntMovement.nature = data.nature;
        accuntMovement.auxiliary = await this.accountService.findOne(
          data.idAccount,
        );
        if (data.company) {
          accuntMovement.company = await this.companyService.findOne(
            data.company,
          );
        } else {
          accuntMovement.user = await this.userService.findOne(data.user);
        }

        accountsMovements.push(accuntMovement);

        if (installmentQuery.movement_deferred) {
          const accuntMovementInterest: AccountMovement = new AccountMovement();
          accuntMovementInterest.value = installmentQuery.interest;

          accuntMovementInterest.nature = data.nature;
          accuntMovementInterest.auxiliary = await this.accountService.findOne(
            data.idAccount,
          );
          if (data.company) {
            accuntMovementInterest.company = await this.companyService.findOne(
              data.company,
            );
          } else {
            accuntMovementInterest.user = await this.userService.findOne(
              data.user,
            );
          }
          accountsMovements.push(accuntMovementInterest);
        }
        cashMovement.movement = movement;
        cashMovement.group_id = movement_id;
        cashMovement.installment_cash = installmentQuery;
        cashMovement.account_movement = accountsMovements;

        cashMovements.push(cashMovement);
      }
    }
    try {
      await this.movementCashRegisterRepository.save(cashMovements);
      return true;
    } catch (e) {
      /* handle error */
      return false;
    }
  }

  async findAllSavingCash(date: Date) {
    return await this.dataSource
      .getRepository(ViewSaving)
      .createQueryBuilder('saving')
      .innerJoin(
        Contribution,
        'contribution',
        'saving.id=contribution.savingContributionId and contribution.month=:month and  contribution.year= :year',
      )
      .leftJoin(
        CashRegisterMovement,
        'cash',
        'contribution.id=cash.contributionCashId',
      )
      .where('cash.id is NULL')
      .setParameters({ month: date.getMonth() + 1, year: date.getFullYear() })
      .getMany();
  }

  async createCashSaving(data: SavingPayment) {
    try {
      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      const movement: Movement = new Movement();
      const cashMovements: CashRegisterMovement[] = [];
      movement.id = `RECI_CAJA_${movement_id}`;
      movement.date = data.dateMovement;
      movement.concept = data.concept;
      for (const saving of data.savings) {
        const accountsMovements: AccountMovement[] = [];
        const savingQuery = await this.savingService.findOneSaving(saving);
        const savingCash: CashRegisterMovement = new CashRegisterMovement();
        const contribution: Contribution =
          await this.contributionService.findOne({
            where: {
              month: data.datePayment.getMonth() + 1,
              year: data.datePayment.getFullYear(),
              saving_contribution: { id: saving },
            },
            relations: { saving_contribution: true },
          });

        console.log(contribution);
        for (const account of savingQuery.typeSaving.auxiliaries) {
          if (account.nature === NatureEnum.DEBIT) {
            const accuntMovement: AccountMovement = new AccountMovement();
            accuntMovement.nature = NatureEnum.CREDIT;
            accuntMovement.auxiliary = account.account;
            accuntMovement.value = savingQuery.qoutaValue;
            accuntMovement.user = savingQuery.affiliate.user;

            accountsMovements.push(accuntMovement);
          }
        }
        const accuntMovement: AccountMovement = new AccountMovement();
        accuntMovement.value = savingQuery.qoutaValue;
        accuntMovement.nature = data.nature;
        accuntMovement.auxiliary = await this.accountService.findOne(
          data.idAccount,
        );
        if (data.company) {
          accuntMovement.company = await this.companyService.findOne(
            data.company,
          );
        } else {
          accuntMovement.user = await this.userService.findOne(data.user);
        }

        accountsMovements.push(accuntMovement);

        savingCash.movement = movement;
        savingCash.group_id = movement_id;
        savingCash.contribution_cash = contribution;
        savingCash.account_movement = accountsMovements;

        cashMovements.push(savingCash);
      }
      await this.movementCashRegisterRepository.save(cashMovements);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async createNoteCash(data: NotePayment) {
    try {
      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      const movement: Movement = new Movement();
      const cashMovements: CashRegisterMovement[] = [];
      movement.id = `RECI_CAJA_${movement_id}`;
      movement.date = data.dateMovement;
      movement.concept = data.concept;
      for (const note of data.notes) {
        const noteMovement = await this.noteService.findOne({
          where: { id: note },
          relations: {
            account_movement: { auxiliary: true, user: true, company: true },
          },
        });
        const noteCash: CashRegisterMovement = new CashRegisterMovement();
        const accountsMovements: AccountMovement[] = [];
        let value = 0;
        for (const account of noteMovement.account_movement) {
          if (account.nature === NatureEnum.CREDIT) {
            value = account.value;
          }
          if (account.nature === NatureEnum.DEBIT) {
            const accuntMovement: AccountMovement = new AccountMovement();
            accuntMovement.nature = NatureEnum.CREDIT;
            accuntMovement.auxiliary = account.auxiliary;
            accuntMovement.value = account.value;
            if (account.user) {
              accuntMovement.user = account.user;
            }
            if (account.company) {
              accuntMovement.company = account.company;
            }

            accountsMovements.push(accuntMovement);
          }
        }
        const accuntMovement: AccountMovement = new AccountMovement();
        accuntMovement.value = value;
        accuntMovement.nature = data.nature;
        accuntMovement.auxiliary = await this.accountService.findOne(
          data.idAccount,
        );
        if (data.company) {
          accuntMovement.company = await this.companyService.findOne(
            data.company,
          );
        } else {
          accuntMovement.user = await this.userService.findOne(data.user);
        }
        accountsMovements.push(accuntMovement);
        noteCash.movement = movement;
        noteCash.group_id = movement_id;
        noteCash.note_cash = noteMovement;
        noteCash.account_movement = accountsMovements;

        cashMovements.push(noteCash);
      }
      await this.movementCashRegisterRepository.save(cashMovements);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async delete(cashs: CashRegisterMovement[]): Promise<ResponseGraphql | null> {
    const creditsAproved = [];
    if (cashs[0].contribution_cash) {
      for (const cash of cashs) {
        const query = await this.contributionService.findOne({
          where: { id: cash.contribution_cash.id },
          relations: { saving_contribution: true },
        });

        if (
          await this.exist({
            where: {
              contribution_cash: {
                year: query.month === 12 ? query.year + 1 : query.year,
                month: query.month === 12 ? 1 : query.month + 1,
                saving_contribution: {
                  id: query.saving_contribution.id,
                },
              },
            },
            relations: {
              contribution_cash: { saving_contribution: true },
            },
          })
        ) {
          return {
            state: false,
            message: `No se puede eliminar el movimiento porque el ahorro ${query.saving_contribution.id} registra pagos  `,
          };
        }
      }
    }
    if (cashs[0].installment_cash) {
      const credits = [];
      let credit = 0;
      for (const cash of cashs) {
        if (cash.installment_cash.installmentNumber !== 1) {
          creditsAproved.push(cash.installment_cash.id_credit);
        }
        if (cash.installment_cash.id_credit !== credit) {
          credit = cash.installment_cash.id_credit;
          credits.push(credit);
        }
      }
      for await (const credit of credits) {
        const maxCreditPayment =
          await this.installmentService.finMaxPayment(credit);
        if (this.findMaxForObjectWithId(cashs, credit) !== maxCreditPayment) {
          return {
            state: false,
            message: `El movimiento no se puede eliminar porque el credito ${credit} tiene coutas pagadas `,
          };
        }
      }
    }
    try {
      await this.movementCashRegisterRepository.remove(cashs);

      for await (const credit of creditsAproved) {
        await this.creditService.updateState(credit, StateCredit.DESEMBOLSADO);
      }
      return null;
    } catch (e) {}
  }

  findMaxForObjectWithId(array: CashRegisterMovement[], targetId: number) {
    return array.reduce(
      (max: CashRegisterMovement, current: CashRegisterMovement) => {
        if (
          current.installment_cash.id_credit === targetId &&
          current.installment_cash.installmentNumber >
            max.installment_cash.installmentNumber
        ) {
          return current;
        }
        return max;
      },
    ).installment_cash.installmentNumber;
  }
  async findMaxGroup() {
    return this.dataSource
      .createQueryBuilder()
      .select(`MAX(cashMovement.group_id)`, 'max')
      .from(CashRegisterMovement, 'cashMovement')
      .getRawOne();
  }

  isPayment(array: number[]) {
    let i = 0;
    while (i < array.length - 1) {
      if (Math.abs(array[i] - array[++i]) !== 1) return array[i];
    }
    return 0;
  }
}
