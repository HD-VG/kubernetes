/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { IConfigurationCalculationRepositoryToken } from '../tokens/configuration_calculation.tokens';

@Injectable()
export class ListConfigurationCalculationUseCase {
  constructor(
    @Inject(IConfigurationCalculationRepositoryToken)
    private readonly configurationCalculationRepository: IConfigurationCalculationRepository,
  ) {}

  async execute() {
    return await this.configurationCalculationRepository.listConfigurations();
  }
}
