/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { UpdateConfigurationCalculationDto } from 'src/presentation/dtos/cc_configuration_calculations/index.dto';
import { IConfigurationCalculationRepositoryToken } from '../tokens/configuration_calculation.tokens';

@Injectable()
export class UpdateConfigurationCalculationUseCase {
  constructor(
    @Inject(IConfigurationCalculationRepositoryToken)
    private readonly configurationCalculationRepository: IConfigurationCalculationRepository,
  ) {}

  async execute(id:number, dto: UpdateConfigurationCalculationDto, userId: number) {
    return await this.configurationCalculationRepository.update(id, dto, userId);
  }
}
