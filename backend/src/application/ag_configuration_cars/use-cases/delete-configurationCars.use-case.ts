/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class DeleteConfigurationCarsUseCase {
  constructor(
    @Inject(IConfigurationCarsToken)
    private readonly configurationCarsRepository: IConfigurationCarsRepository,
  ) {}

  async execute(deleteCarId:FindByUuid, userId: FindById) {
    return this.configurationCarsRepository.delete(deleteCarId, userId);
  }
}
