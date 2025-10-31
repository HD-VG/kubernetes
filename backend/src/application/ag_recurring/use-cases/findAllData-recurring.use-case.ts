/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IRecurringToken } from '../tokens/recurring.tokens';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';

@Injectable()
export class FindAllDataRecurringUseCase {
  constructor(
    @Inject(IRecurringToken)
    private readonly recurringRepository: IRecurringRepository,
  ) {}

  async execute() {
    return await this.recurringRepository.findAllData();
  }
}
