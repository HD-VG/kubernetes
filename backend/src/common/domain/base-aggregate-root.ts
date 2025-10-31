/* eslint-disable prettier/prettier */
import { IDomainEvent } from './events/domain-event.interface';

export abstract class BaseAggregateRoot {
  private domainEvents: IDomainEvent[] = [];

  protected addDomainEvent(event: IDomainEvent): void {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): IDomainEvent[] {
    return this.domainEvents;
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }
}
