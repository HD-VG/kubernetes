/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class FindByConfigurationCarsUseCase {
  constructor(
    @Inject(IConfigurationCarsToken)
    private readonly configurationCarsRepository: IConfigurationCarsRepository,
  ) {}

  async execute(viewCarId: FindByUuid) {
    return await this.configurationCarsRepository.findOne(viewCarId);
  }
}
