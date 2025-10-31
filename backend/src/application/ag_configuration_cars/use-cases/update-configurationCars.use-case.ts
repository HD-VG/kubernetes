/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
@Injectable()
export class UpdateConfigurationCarsUseCase {
  constructor(
    @Inject(IConfigurationCarsToken)
    private readonly configurationCarsRepository: IConfigurationCarsRepository,
  ) {}

  async execute(updateCarId:FindByUuid, updateCarDto: UpdateConfigurationCarDto, userId: FindById) {
    return this.configurationCarsRepository.update(updateCarId, updateCarDto, userId);
  }
}
