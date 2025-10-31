/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
import { IRecurringToken } from '../tokens/recurring.tokens';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { FindById } from 'src/common/dto/index.dto';

@Injectable()
export class CreateRecurringUseCase {
  constructor(
    @Inject(IRecurringToken)
    private readonly recurringRepository: IRecurringRepository,
  ) {}

  async execute(createRecurringDto: CreateRecurringDto, userId: FindById) {
    return this.recurringRepository.create(createRecurringDto, userId);
  }
}
