import { DisbursementMovement } from './disbursement-movement.entity';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';

@EventSubscriber()
export class DisbursementMovementSubscriber
  implements EntitySubscriberInterface<DisbursementMovement>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return DisbursementMovement;
  }

  async afterInsert(event: InsertEvent<DisbursementMovement>): Promise<any> {
    if (event.entity.credit_disbursement) {
      await event.queryRunner.manager.update(
        Credit,
        { id: event.entity.credit_disbursement.id },
        { state: StateCredit.DESEMBOLSADO },
      );
    }
  }
  async afterRemove(event: RemoveEvent<DisbursementMovement>): Promise<any> {
    if (event.entity.credit_disbursement) {
      await event.queryRunner.manager.update(
        Credit,
        { id: event.entity.credit_disbursement.id },
        { state: StateCredit.APROBADO },
      );
    }
  }
}
