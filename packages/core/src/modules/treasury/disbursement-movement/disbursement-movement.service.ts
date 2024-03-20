import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { CreditDisbursementInput } from './dto/types';
import { CreditService } from 'src/modules/wallet/credit/credit.service';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { CompanyService } from 'src/modules/parameterization/thirds/company/company.service';
import { UserService } from 'src/modules/parameterization/thirds/user/user.service';
import { TypeAccountCreditEnum } from 'src/modules/parameterization/type-credit/dto/enum-types';
import { AuxiliaryService } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.service';
import { DisbursementMovement } from './disbursement-movement.entity';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { NotePayment } from '../note-movement/dto/types';
import { NoteMovementService } from '../note-movement/note-movement.service';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import { InputSearchMovement } from '../movement/dto/types';
import { NoteMovement } from '../note-movement/note-movement.entity';
@Injectable()
export class DisbursementMovementService {
  constructor(
    @InjectRepository(DisbursementMovement)
    private readonly movementDisbursementRepository: Repository<DisbursementMovement>,
    @Inject(forwardRef(() => CreditService))
    private readonly creditService: CreditService,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly accountService: AuxiliaryService,
    private dataSource: DataSource,
    private readonly noteService: NoteMovementService,
  ) {}
  async find(data: InputSearchMovement) {
    return await this.dataSource
      .createQueryBuilder()
      .addSelect('movement.id', 'id')
      .addSelect('movement.date', 'date')
      .addSelect('movement.concept', 'concept')
      .from(Movement, 'movement')
      .distinct(true)
      .innerJoin(
        DisbursementMovement,
        'disburment_movement',
        'movement.id=disburment_movement.movementId',
      )
      .leftJoin(
        AccountMovement,
        'account_movement',
        'disburment_movement.id = account_movement.movementDisburmentId',
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
  async findMovementById(id: string): Promise<DisbursementMovement[]> {
    return await this.movementDisbursementRepository.find({
      where: { movementId: id },
      relations: { note_disbursement: true },
    });
  }

  async exist(options: FindManyOptions<DisbursementMovement>) {
    return await this.movementDisbursementRepository.exist(options);
  }
  async findByMovement(movement: string) {
    console.log(movement);
    const query = await this.findMovementById(movement);
    console.log(query);
    if (query.length > 0) {
      if (query[0].noteDisbursementId) {
        return await this.noteService.findByMovementNote(
          query[0].note_disbursement.movementId,
          true,
        );
      } else {
        return await this.findByMovementCredit(movement);
      }
    }
  }

  async findByMovementCredit(movement: string) {
    console.log(movement);
    return await this.dataSource
      .getRepository(ViewCredit)
      .createQueryBuilder('view_credit')
      .innerJoin(
        DisbursementMovement,
        'disburment_movement',
        'disburment_movement.creditDisbursementId=view_credit.id',
      )
      .where('disburment_movement.movementId= :movement', {
        movement: movement,
      })

      .getMany();
  }
  async findMovementNoteById(id: string): Promise<DisbursementMovement[]> {
    return await this.movementDisbursementRepository.find({
      where: { movementId: id },
      relations: { note_disbursement: true },
    });
  }

  //Credit
  async createDisbursementPayment(data: CreditDisbursementInput) {
    try {
      for (const credit of data.credits) {
        const creditQuery = await this.creditService.findOne({
          relations: {
            disbursement_movement: true,
          },
          where: { id: credit },
        });
        console.log(creditQuery);

        if (!creditQuery || creditQuery.disbursement_movement) {
          console.log(creditQuery);
          return false;
        }
      }

      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      console.log(max, movement_id);

      const movement: Movement = new Movement();
      movement.id = `COMP_EGRE_${movement_id}`;
      movement.date = data.date;
      movement.concept = data.concept;
      const disbursementsMovements: DisbursementMovement[] = [];
      for (const credit of data.credits) {
        const disbursementMovement: DisbursementMovement =
          new DisbursementMovement();

        const accountsMovements: AccountMovement[] = [];
        const creditQuery = await this.creditService.findOne({
          relations: {
            affiliate: {
              user: true,
            },
            typeCredit: {
              auxiliaries: {
                account: true,
              },
            },
          },
          where: { id: credit },
        });
        for (const account of creditQuery.typeCredit.auxiliaries) {
          if (
            account.nature === NatureEnum.CREDIT &&
            account.typeAccount === TypeAccountCreditEnum.CAPITAL
          ) {
            const accuntMovement: AccountMovement = new AccountMovement();
            accuntMovement.nature = NatureEnum.DEBIT;
            accuntMovement.auxiliary = account.account;
            accuntMovement.value = creditQuery.creditValue;
            accuntMovement.user = creditQuery.affiliate.user;
            accountsMovements.push(accuntMovement);
          }
        }

        const accuntMovement: AccountMovement = new AccountMovement();
        accuntMovement.value = creditQuery.creditValue;
        accuntMovement.nature = data.nature;
        accuntMovement.auxiliary = await this.accountService.findOne(
          data.idAccount,
        );

        accuntMovement.user = creditQuery.affiliate.user;
        accountsMovements.push(accuntMovement);
        disbursementMovement.movement = movement;
        disbursementMovement.group_id = movement_id;
        disbursementMovement.credit_disbursement = creditQuery;
        disbursementMovement.account_movement = accountsMovements;

        // await this.movementDisbursementRepository.save(disbursementMovement);
        disbursementsMovements.push(disbursementMovement);
      }
      console.log('safsdfjksd');
      await this.movementDisbursementRepository.save(disbursementsMovements);
      return true;
    } catch (e) {
      /* handle error */
      console.log(e);
      return false;
    }
  }
  //Note
  async createNoteDisbursement(data: NotePayment) {
    try {
      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      const movement: Movement = new Movement();
      const disbursementsMovements: DisbursementMovement[] = [];
      movement.id = `COMP_EGRE_${movement_id}`;
      movement.date = data.dateMovement;
      movement.concept = data.concept;
      for (const note of data.notes) {
        const noteMovement = await this.noteService.findOne({
          where: { id: note },
          relations: {
            account_movement: { auxiliary: true, user: true, company: true },
          },
        });
        const noteDisbursement: DisbursementMovement =
          new DisbursementMovement();
        const accountsMovements: AccountMovement[] = [];
        let value = 0;
        for (const account of noteMovement.account_movement) {
          if (account.nature === NatureEnum.DEBIT) {
            value = account.value;
          }
          if (account.nature === NatureEnum.CREDIT) {
            const accuntMovement: AccountMovement = new AccountMovement();
            accuntMovement.nature = NatureEnum.DEBIT;
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
        noteDisbursement.movement = movement;
        noteDisbursement.group_id = movement_id;
        noteDisbursement.note_disbursement = noteMovement;
        noteDisbursement.account_movement = accountsMovements;

        disbursementsMovements.push(noteDisbursement);
      }
      await this.movementDisbursementRepository.save(disbursementsMovements);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async delete(
    disbursements: DisbursementMovement[],
  ): Promise<ResponseGraphql> {
    if (disbursements[0]?.credit_disbursement) {
      for await (const disbursement of disbursements) {
        for await (const installments of disbursement.credit_disbursement
          .installments) {
          if (installments.movement_cash) {
            console.log(
              'this movement cant delete',
              installments.id_credit,
              installments.installmentNumber,
            );
            return {
              state: false,
              message: `El movimiento no se puede eliminar porque el credito ${installments.id_credit} registra pagos`,
            };
          }

          if (installments.movement_deferred) {
            console.log(
              'this movement cant delete',
              installments.id_credit,
              installments.installmentNumber,
            );
            return {
              state: false,
              message: `El movimiento no se puede eliminar porque el credito ${installments.id_credit} registra diferidos`,
            };
          }
        }
      }
    }
    try {
      await this.movementDisbursementRepository.remove(disbursements);
      return null;
    } catch (e) {
      return {
        state: false,
        message: `El movimiento no se puede eliminar `,
      };

      /* handle error */
    }
  }
  async findByDateStateDisbursement(date: Date): Promise<ViewCredit[]> {
    console.log(date.getMonth());
    const data = await this.dataSource.manager
      .createQueryBuilder()
      .from(ViewCredit, 'viewCredit')
      .where(`MONTH(viewCredit.startDate) = :month`, {
        month: date.getMonth() + 1,
      })
      .andWhere('viewCredit.state = :state', { state: StateCredit.APROBADO })
      .getRawMany();
    return data;
  }

  async findMaxGroup() {
    return this.dataSource
      .createQueryBuilder()
      .select(`MAX(disbursementMovement.group_id)`, 'max')
      .from(DisbursementMovement, 'disbursementMovement')
      .getRawOne();
  }
}
