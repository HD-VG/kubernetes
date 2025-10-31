/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IRecurringToken } from '../tokens/recurring.tokens';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class FindByRecurringUseCase {
  constructor(
    @Inject(IRecurringToken)
    private readonly recurringRepository: IRecurringRepository,
  ) {}

  async execute(viewRecurringId: FindByUuid) {
    return await this.recurringRepository.findOne(viewRecurringId);
  }
}
