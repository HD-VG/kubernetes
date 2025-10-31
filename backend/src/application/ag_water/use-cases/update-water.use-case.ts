/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
import { IWaterToken } from '../tokens/worker.tocken';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class UpdateWaterUseCase {
  constructor(
    @Inject(IWaterToken)
    private readonly waterRepository: IWaterRepository,
  ) {}

  async execute(updateWaterId:FindByUuid ,updateWaterDto: UpdateWaterDto, userId: FindById) {
    return this.waterRepository.update(updateWaterId, updateWaterDto, userId);
  }
}
