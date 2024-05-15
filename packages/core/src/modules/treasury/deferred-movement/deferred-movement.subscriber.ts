import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { DeferredMovement } from './deferred-movement.entity';
import { Contribution } from 'src/modules/wallet/contribution/contribution.entity';

@EventSubscriber()
export class DeferredMovementSubscriber
  implements EntitySubscriberInterface<DeferredMovement>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return DeferredMovement;
  }

  async afterRemove(event: RemoveEvent<DeferredMovement>) {
    if (event.entity.contribution_deferred) {
      await event.queryRunner.manager.remove(
        Contribution,
        event.entity.contribution_deferred,
      );
    }
  }
}
