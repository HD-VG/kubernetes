/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IWaterToken } from '../tokens/worker.tocken';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';

@Injectable()
export class FindAllDataWaterUseCase {
  constructor(
    @Inject(IWaterToken)
    private readonly waterRepository: IWaterRepository,
  ) {}

  async execute() {
    return await this.waterRepository.findAllData();
  }
}
