/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IWaterToken } from '../tokens/worker.tocken';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class ListWaterUseCase {
  constructor(
    @Inject(IWaterToken)
    private readonly waterRepository: IWaterRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return await this.waterRepository.list(paginationDto);
  }
}
