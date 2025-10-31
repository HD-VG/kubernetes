/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class CreateConfigurationCarsUseCase {
  constructor(
    @Inject(IConfigurationCarsToken)
    private readonly debtorRepository: IConfigurationCarsRepository,
  ) {}

  async execute(createCarDto: CreateConfigurationCarDto, userId: FindById) {
    return this.debtorRepository.create(createCarDto, userId);
  }
}
