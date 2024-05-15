import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Movement } from './movement.entity';
import { IdentifierMovement } from './dto/enum-types';
import { CashRegisterMovementService } from '../cash-register-movement/cash-register-movement.service';
import { DeferredMovementService } from '../deferred-movement/deferred-movement.service';
import { DisbursementMovementService } from '../disbursement-movement/disbursement-movement.service';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { NoteMovementService } from '../note-movement/note-movement.service';
@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
    private readonly cashService: CashRegisterMovementService,
    private readonly noteSevice: NoteMovementService,
    private readonly deferredService: DeferredMovementService,
    private readonly disbursementService: DisbursementMovementService,
  ) {}

  async create(movement: Movement): Promise<Movement> {
    try {
      return this.movementRepository.save(movement);
    } catch (e) {
      /* handle error */
      console.log(e);
    }
  }

  async find(): Promise<Movement[]> {
    return await this.movementRepository.find();
  }
  async findOne(options: FindOneOptions<Movement>): Promise<Movement> {
    return await this.movementRepository.findOne(options);
  }

  async delete(id: string): Promise<ResponseGraphql> {
    if (id.includes(IdentifierMovement.CASH_REGISTER)) {
      const query = await this.findOne({
        where: { id: id },
        relations: {
          cash_movement: { installment_cash: true, contribution_cash: true },
        },
      });

      if (query?.cash_movement) {
        const response = await this.cashService.delete(query.cash_movement);
        if (response) {
          return response;
        } else {
          return this.deleteById(id);
        }
      }
    } else if (id.includes(IdentifierMovement.DEFERRED)) {
      const query = await this.findOne({
        where: { id: id },
        relations: {
          deferred_movement: {
            installment_deferred: true,
            contribution_deferred: true,
          },
        },
      });

      if (query?.deferred_movement.length > 0) {
        const response = await this.deferredService.delete(
          query.deferred_movement,
        );
        if (response) {
          return response;
        } else {
          return this.deleteById(id);
        }
      }
    } else if (id.includes(IdentifierMovement.DISBURSEMENT)) {
      const query = await this.findOne({
        where: { id: id },
        relations: {
          disbursement_movement: {
            note_disbursement: true,
            credit_disbursement: {
              installments: { movement_deferred: true, movement_cash: true },
            },
          },
        },
      });

      if (query?.disbursement_movement) {
        const response = await this.disbursementService.delete(
          query.disbursement_movement,
        );
        if (response) {
          return response;
        } else {
          return this.deleteById(id);
        }
      }
    } else if (id.includes(IdentifierMovement.CREDIT)) {
      return {
        state: false,
        message: `Para eliminar el movimiento se tiene que eliminar el credito `,
      };
    } else if (id.includes(IdentifierMovement.OTHER)) {
      try {
        const query = await this.findOne({
          where: { id: id },
          relations: {
            note_movemnt: { disbursement_movement: true, movement_cash: true },
          },
        });
        for await (const note of query.note_movemnt) {
          if (note.disbursement_movement) {
            return {
              state: false,
              message: `No se puede eliminar el movimiento porque tiene registrado un comprobante de egreso `,
            };
          }
          if (note.movement_cash) {
            return {
              state: false,
              message: `No se puede eliminar el movimiento porque tiene registrado un recibo de caja `,
            };
          }
        }
        await this.noteSevice.delete(query.note_movemnt);
        return this.deleteById(id);
      } catch (error) {
        return {
          state: false,
          message: `No se puede eliminar el movimiento `,
        };
      }
    }
  }

  async deleteById(id: string): Promise<ResponseGraphql> {
    try {
      await this.movementRepository.delete(id);
      return {
        state: true,
        message: `El movimiento ha sido eliminado `,
      };
    } catch (e) {
      /* handle error */
    }
  }
}
