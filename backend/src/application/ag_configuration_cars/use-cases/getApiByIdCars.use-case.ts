/* eslint-disable prettier/prettier */
//este sera el caso de uso para ver los cars de la api 
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationCarsToken } from '../tokens/configuration_cars.tokens';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';

@Injectable()
export class GetApiByIdCarsUseCase {
    constructor(
        @Inject(IConfigurationCarsToken)
        private readonly configurationCarsRepository: IConfigurationCarsRepository,
    ) {}

    async execute(id:number) {
        return this.configurationCarsRepository.findByIdDataApi(id);
    }
}
