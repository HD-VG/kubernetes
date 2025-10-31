/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { FindById } from 'src/common/dto/index.dto';
import { IConfigurationCalculationRepositoryToken } from '../tokens/configuration_calculation.tokens';

@Injectable()
export class ModifyStatusConfigurationCalculationUseCase {
  constructor(
    @Inject(IConfigurationCalculationRepositoryToken)
    private readonly configurationCalculationRepository: IConfigurationCalculationRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.configurationCalculationRepository.modify_status(dto, userId);
  }
}
