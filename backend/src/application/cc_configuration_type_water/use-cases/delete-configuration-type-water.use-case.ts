/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeWaterRepositoryToken } from '../tokens/configuration-tpe-water-repository.tokens';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class DeleteConfigurationTypeWaterUseCase {
  constructor(
    @Inject(IConfigurationTypeWaterRepositoryToken)
    private readonly configurationTypeWater: IConfigurationTypeWaterRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.configurationTypeWater.delete(dto, userId);
  }
}
