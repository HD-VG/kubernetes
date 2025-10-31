/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IRecurringToken } from '../tokens/recurring.tokens';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class DeleteRecurringUseCase {
  constructor(
    @Inject(IRecurringToken)
    private readonly recurringRepository: IRecurringRepository,
  ) {}

  async execute(deleteRecurringId: FindByUuid,userId: FindById) {
    console.log("su id ", deleteRecurringId)
    return await this.recurringRepository.delete(deleteRecurringId,userId);
  }
}
