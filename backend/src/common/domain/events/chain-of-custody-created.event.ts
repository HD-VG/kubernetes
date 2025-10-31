/* eslint-disable prettier/prettier */
import { IDomainEvent } from 'src/common/domain/events/domain-event.interface';

export class ChainOfCustodyCreatedEvent implements IDomainEvent {
  readonly aggregateId: number;
  readonly occurredOn: Date;
  readonly eventName: string = 'ChainOfCustodyCreated';
  readonly codeCustody: string;
  readonly createUserId: number;

  constructor(
    chainOfCustodyId: number,
    codeCustody: string,
    createUserId: number,
  ) {
    this.aggregateId = chainOfCustodyId;
    this.codeCustody = codeCustody;
    this.createUserId = createUserId;
    this.occurredOn = new Date();
  }
}
