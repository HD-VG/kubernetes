/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IWaterToken } from '../tokens/worker.tocken';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class FindByWaterUseCase {
  constructor(
    @Inject(IWaterToken)
    private readonly waterRepository: IWaterRepository,
  ) {}

  async execute(viewWaterId: FindByUuid) {
    return await this.waterRepository.findOne(viewWaterId);
  }
}
