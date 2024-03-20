import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NoteMovement } from './note-movement.entity';
import { Movement } from '../movement/movement.entity';
import { EnumTypeNote, NoteMovementInput } from './dto/types';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { CashRegisterMovement } from '../cash-register-movement/cash-register-movement.entity';
import { DisbursementMovement } from '../disbursement-movement/disbursement-movement.entity';
import { InputSearchMovement } from '../movement/dto/types';
import { MovementOutput } from '../deferred-movement/dto/types';
@Injectable()
export class NoteMovementService {
  constructor(
    @InjectRepository(NoteMovement)
    private readonly movementNoteRepository: Repository<NoteMovement>,
    private dataSource: DataSource,
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
        NoteMovement,
        'note_movement',
        'movement.id=note_movement.movementId',
      )
      .leftJoin(
        AccountMovement,
        'account_movement',
        'note_movement.id = account_movement.movementNoteId',
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

  async findOne(options: FindOneOptions<NoteMovement>) {
    return this.movementNoteRepository.findOne(options);
  }

  async findByMovementNote(movement: string, many?: boolean): Promise<any> {
    const query = this.dataSource
      .createQueryBuilder()
      .addSelect('movement.id', 'id')
      .addSelect('movement.id', 'id_note')
      .addSelect('movement.date', 'date')
      .addSelect('movement.concept', 'concept')
      .from(Movement, 'movement')
      .distinct(true)
      .innerJoin(
        NoteMovement,
        'note_movement',
        'movement.id=note_movement.movementId',
      )
      .where('note_movement.movementId=:movement', { movement: movement });
    if (many) {
      return query.getRawMany();
    } else {
      return query.getRawOne();
    }
  }

  async isUpdate(idMovement: string): Promise<ResponseGraphql> {
    const query = await this.findOne({
      where: { movementId: idMovement },
      relations: {
        movement_cash: { account_movement: true },
        disbursement_movement: { account_movement: true },
      },
    });
    if (query.disbursement_movement) {
      return {
        state: false,
        message:
          'La cuenta no se puede actualizar elimina el comprobante de egreso ',
      };
    }
    if (query.movement_cash) {
      return {
        state: false,
        message: 'La cuenta no se puede actualizar elimina el recibo de caja',
      };
    }

    return { state: true, message: 'La se puede actualizar' };
  }
  async findMovementPayment(
    startDate: Date,
    endDate: Date,
    typeNote: EnumTypeNote,
  ) {
    const query = this.dataSource
      .createQueryBuilder()
      .addSelect('movement.id', 'id')
      .addSelect('note_movement.id', 'noteId')
      .addSelect('movement.date', 'date')
      .addSelect('movement.concept', 'concept')
      .from(Movement, 'movement')
      .distinct(true)
      .innerJoin(
        NoteMovement,
        'note_movement',
        'movement.id=note_movement.movementId',
      );
    typeNote === EnumTypeNote.CASH &&
      query.leftJoin(
        CashRegisterMovement,
        'cash',
        'note_movement.id=cash.noteCashId',
      );
    typeNote === EnumTypeNote.DISBURSEMENT &&
      query
        .leftJoin(
          DisbursementMovement,
          'disbursement_movement',
          'note_movement.id=disbursement_movement.noteDisbursementId',
        )
        .andWhere('movement.date>= :startDate', {
          startDate: startDate.toISOString().split('T', 1),
        })
        .andWhere('movement.date<= :endDate', {
          endDate: endDate.toISOString().split('T', 1),
        });
    query.andWhere('note_movement.type= :type', { type: typeNote });

    typeNote === EnumTypeNote.CASH && query.andWhere('cash.noteCashId IS NUll');
    typeNote === EnumTypeNote.DISBURSEMENT &&
      query.andWhere('disbursement_movement.noteDisbursementId IS NUll');
    console.log(query.getQueryAndParameters());
    return query.getRawMany();
  }

  async exist(options: FindManyOptions<NoteMovement>) {
    return await this.movementNoteRepository.exist(options);
  }

  async update(
    data: NoteMovementInput,
    idMovement: string,
  ): Promise<ResponseGraphql> {
    try {
      if (await this.isUpdate(idMovement)) {
        const note = await this.findOne({
          where: { movementId: idMovement },
          relations: {
            movement: true,
            account_movement: true,
          },
        });
        console.log(note);
        note.movement.date = data.date;
        note.movement.concept = data.concept;
        note.type = data.type;
        for (let i = 0; i < note.account_movement.length; i++) {
          note.account_movement[i].auxiliaryCode = data.accounts[i].account;
          if (data.accounts[i].company) {
            note.account_movement[i].companyIdentification =
              data.accounts[i].company;
            note.account_movement[i].userIdentification = null;
          } else {
            note.account_movement[i].userIdentification = data.accounts[i].user;
            note.account_movement[i].companyIdentification = null;
          }
          note.account_movement[i].value = data.accounts[i].value;
          note.account_movement[i].nature = data.accounts[i].nature;
        }

        await this.movementNoteRepository.save(note);
        return { state: true, message: 'Se ha  actualizado el movimiento' };
      } else {
        return {
          state: false,
          message: 'No se ha podido actualizar el movimiento',
        };
      }
    } catch (e) {
      console.log(e);
      return {
        state: false,
        message: 'No se ha podido actualizar el movimiento',
      };
    }
  }

  async create(data: NoteMovementInput): Promise<ResponseGraphql> {
    try {
      const max = await this.findMaxGroup();
      const movement_id = max.max ? max.max + 1 : 1;
      const movement: Movement = new Movement();
      movement.id = `OTRO_${movement_id}`;
      movement.date = data.date;
      movement.concept = data.concept;
      const noteMovement = new NoteMovement();
      noteMovement.type = data.type;
      noteMovement.movement = movement;
      const account_movements: AccountMovement[] = [];
      for await (const account of data.accounts) {
        const account_movement = new AccountMovement();
        account_movement.auxiliaryCode = account.account;
        if (account.company) {
          account_movement.companyIdentification = account.company;
        } else {
          account_movement.userIdentification = account.user;
        }
        account_movement.value = account.value;
        account_movement.nature = account.nature;
        account_movements.push(account_movement);
      }

      noteMovement.group_id = movement_id;
      noteMovement.account_movement = account_movements;

      await this.movementNoteRepository.save(noteMovement);

      return {
        state: true,
        message: `Se ha creado  la nota contable ${movement.id}`,
      };
    } catch (e) {
      console.log(e);
      return { state: false, message: 'No se ha podido crear el movimiento' };
    }
  }

  async findMaxGroup() {
    return this.dataSource
      .createQueryBuilder()
      .select(`MAX(cashMovement.group_id)`, 'max')
      .from(NoteMovement, 'cashMovement')
      .getRawOne();
  }
  async delete(notes: NoteMovement[]) {
    try {
      await this.movementNoteRepository.remove(notes);
    } catch (e) {}
  }
}
