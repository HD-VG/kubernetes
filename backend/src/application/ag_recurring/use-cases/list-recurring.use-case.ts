/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IRecurringToken } from '../tokens/recurring.tokens';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class ListRecurringUseCase {
  constructor(
    @Inject(IRecurringToken)
    private readonly recurringRepository: IRecurringRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return await this.recurringRepository.list(paginationDto);
  }
}
