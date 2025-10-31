/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateTypeWaterDto } from 'src/presentation/dtos/cc_configuration_type_water/update-type_water.dto';
import { IConfigurationTypeWaterRepositoryToken } from '../tokens/configuration-tpe-water-repository.tokens';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';

@Injectable()
export class UpdateConfigurationTypeWaterUseCase {
  constructor(
    @Inject(IConfigurationTypeWaterRepositoryToken)
    private readonly configurationTypeWater: IConfigurationTypeWaterRepository,
  ) {}

  async execute(id: number, dto: UpdateTypeWaterDto, userId: number) {
    return this.configurationTypeWater.update(id, dto, userId);
  }
}
