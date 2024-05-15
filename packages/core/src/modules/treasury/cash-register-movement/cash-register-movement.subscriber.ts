import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { CashRegisterMovement } from './cash-register-movement.entity';
import { Installment } from 'src/modules/wallet/credit/installments/installment.entity';
import { StateInstallment } from 'src/modules/wallet/credit/installments/dto/enum-types';

@EventSubscriber()
export class CashRegisterMovementSubscriber
  implements EntitySubscriberInterface<CashRegisterMovement>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return CashRegisterMovement;
  }

  async afterInsert(event: InsertEvent<CashRegisterMovement>): Promise<any> {
    if (event.entity.installment_cash) {
      if (event.entity.installment_cash.movement_deferred) {
        await event.queryRunner.manager.update(
          Installment,
          {
            id_credit: event.entity.installment_cash.id_credit,
            installmentNumber: event.entity.installment_cash.installmentNumber,
          },
          { state: StateInstallment.PAGADA },
        );
      } else {
        await event.queryRunner.manager.update(
          Installment,
          {
            id_credit: event.entity.installment_cash.id_credit,
            installmentNumber: event.entity.installment_cash.installmentNumber,
          },
          { state: StateInstallment.PAGO_ANTICIPADO },
        );
      }
      if (event.entity.installment_cash.installmentNumber === 1) {
        await event.queryRunner.manager.update(
          Credit,
          { id: event.entity.installment_cash.id_credit },
          { state: StateCredit.CURSO },
        );
      }
      if (
        (await event.queryRunner.manager.count(Installment, {
          where: { id_credit: event.entity.installment_cash.id_credit },
        })) === event.entity.installment_cash.installmentNumber
      ) {
        await event.queryRunner.manager.update(
          Credit,
          { id: event.entity.installment_cash.id_credit },
          { state: StateCredit.FINALIZADO },
        );
      }
    }
  }

  async beforeRemove(event: RemoveEvent<CashRegisterMovement>) {
    console.log('Before remove', event.entity);
  }
  async afterRemove(event: RemoveEvent<CashRegisterMovement>) {
    console.log('Remove data', event.entity);

    if (event.entity.installment_cash) {
      await event.queryRunner.manager.update(
        Installment,
        {
          id_credit: event.entity.installment_cash.id_credit,
          installmentNumber: event.entity.installment_cash.installmentNumber,
        },
        { state: StateInstallment.PENDIENTE },
      );
      if (event.entity.installment_cash.installmentNumber === 1) {
        await event.queryRunner.manager.update(
          Credit,
          { id: event.entity.installment_cash.id_credit },
          { state: StateCredit.DESEMBOLSADO },
        );
      }
      const query = await event.queryRunner.manager.count(Installment, {
        where: { id_credit: event.entity.installment_cash.id_credit },
      });
      if (
        query === event.entity.installment_cash.installmentNumber &&
        query !== 1
      ) {
        await event.queryRunner.manager.update(
          Credit,
          { id: event.entity.installment_cash.id_credit },
          { state: StateCredit.CURSO },
        );
      }
    }
  }
}
