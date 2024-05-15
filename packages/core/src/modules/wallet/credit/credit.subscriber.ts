import { Movement } from 'src/modules/treasury/movement/movement.entity';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { Installment } from './installments/installment.entity';
import { StateInstallment } from './installments/dto/enum-types';

@EventSubscriber()
export class CreditSubscriber implements EntitySubscriberInterface<Credit> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return Credit;
  }

  async afterRemove(event: RemoveEvent<Credit>): Promise<any> {
    console.log(event.entity);
    if (event.entity) {
      try {
        if (event.entity.credit_refinance) {
          console.log(event.entity.credit_refinance);
          await event.queryRunner.manager.update(
            Credit,
            { id: event.entity.credit_refinance.id },
            { state: StateCredit.CURSO },
          );
          const installments = await event.queryRunner.manager.find(
            Installment,
            {
              where: {
                id_credit: event.entity.credit_refinance.id,
                state: StateInstallment.REFINANCIADA,
              },
            },
          );

          for await (const installment of installments) {
            await event.queryRunner.manager.update(
              Installment,
              {
                id_credit: installment.id_credit,
                installmentNumber: installment.installmentNumber,
              },
              { state: StateInstallment.PENDIENTE },
            );
          }
        }

        await event.queryRunner.manager.remove(
          Movement,
          event.entity.credit_movement.movement,
        );
      } catch (e) {
        console.log(e);
        console.log(event.entity);
        /* handle error */
      }
    }
  }
}
