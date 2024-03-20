import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Saving } from './saving.entity';

@EventSubscriber()
export class SavingSubscriber implements EntitySubscriberInterface<Saving> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return Saving;
  }
}
