/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
import { IRecurringToken } from '../tokens/recurring.tokens';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class UpdateRecurringUseCase {
  constructor(
    @Inject(IRecurringToken)
    private readonly recurringRepository: IRecurringRepository,
  ) {}

  async execute(updateRecurringId:FindByUuid ,updateRecurringDto: UpdateRecurringDto, userId: FindById) {
    return this.recurringRepository.update(updateRecurringId, updateRecurringDto, userId);
  }
}
