/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateTypeWaterDto } from 'src/presentation/dtos/cc_configuration_type_water/create-type_water.dto';
import { IConfigurationTypeWaterRepositoryToken } from '../tokens/configuration-tpe-water-repository.tokens';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';

@Injectable()
export class CreateConfigurationTypeWaterUseCase {
  constructor(
    @Inject(IConfigurationTypeWaterRepositoryToken)
    private readonly configurationTypeWater: IConfigurationTypeWaterRepository,
  ) {}

  async execute(dto: CreateTypeWaterDto, userId: number) {
    return this.configurationTypeWater.create(dto, userId);
  }
}
