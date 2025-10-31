/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationUtilToken } from '../tokens/configuration_utils.tockens';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';

@Injectable()
export class FindAllDataConfigurationUtilUseCase {
  constructor(
    @Inject(IConfigurationUtilToken)
    private readonly configurationUtilRepository: IConfigurationUtilRepository,
  ) {}

  async execute() {
    return this.configurationUtilRepository.findAllData();
  }
}
