/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ListConfigurationCarsUseCase {
  constructor(
    @Inject(IConfigurationCarsToken)
    private readonly configurationTypeWorkRepository: IConfigurationCarsRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return this.configurationTypeWorkRepository.list(paginationDto);
  }
}
