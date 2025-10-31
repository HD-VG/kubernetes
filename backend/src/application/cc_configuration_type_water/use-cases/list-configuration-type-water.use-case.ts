/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeWaterRepositoryToken } from '../tokens/configuration-tpe-water-repository.tokens';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';

@Injectable()
export class ListConfigurationTypeWaterUseCase {
  constructor(
    @Inject(IConfigurationTypeWaterRepositoryToken)
    private readonly configurationTypeWater: IConfigurationTypeWaterRepository,
  ) {}

  async execute() {
    return await this.configurationTypeWater.list();
  }
}
