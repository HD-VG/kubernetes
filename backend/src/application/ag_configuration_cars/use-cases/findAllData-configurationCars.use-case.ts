/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';

@Injectable()
export class FindAllDataConfigurationCarsUseCase {
  constructor(
    @Inject(IConfigurationCarsToken)
    private readonly configurationCarsRepository: IConfigurationCarsRepository,
  ) {}

  async execute() {
    return this.configurationCarsRepository.findAllData();
  }
}
