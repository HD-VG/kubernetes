/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IWaterToken } from '../tokens/worker.tocken';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class DeleteWaterUseCase {
  constructor(
    @Inject(IWaterToken)
    private readonly waterRepository: IWaterRepository,
  ) {}

  async execute(deleteWaterId:FindByUuid ,userId: FindById) {
    return await this.waterRepository.delete(deleteWaterId,userId);
  }
}
