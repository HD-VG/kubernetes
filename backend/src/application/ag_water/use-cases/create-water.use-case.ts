/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
import { IWaterToken } from '../tokens/worker.tocken';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class CreateWaterUseCase {
  constructor(
    @Inject(IWaterToken)
    private readonly waterRepository: IWaterRepository,
  ) {}

  async execute(createWaterDto: CreateWaterDto, userId: FindById) {
    return this.waterRepository.create(createWaterDto, userId);
  }
}
