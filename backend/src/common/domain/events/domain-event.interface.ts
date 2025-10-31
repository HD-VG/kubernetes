/* eslint-disable prettier/prettier */
export interface IDomainEvent {
  readonly aggregateId: number;
  readonly occurredOn: Date;
  readonly eventName: string;
}