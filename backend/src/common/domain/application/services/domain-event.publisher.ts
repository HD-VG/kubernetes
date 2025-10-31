/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChainOfCustodyCreatedEvent } from '../../events/chain-of-custody-created.event';

@Injectable()
export class ChainOfCustodyCreatedHandler {
  @OnEvent('ChainOfCustodyCreated')
  async handle(event: ChainOfCustodyCreatedEvent): Promise<void> {
    console.log(`[EVENT] ChainOfCustodyCreatedEvent: ${event.codeCustody}`);
  }
}
