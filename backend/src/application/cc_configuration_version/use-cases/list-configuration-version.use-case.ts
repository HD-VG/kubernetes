/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { IConfigurationVersionRepositoryToken } from '../tokens/configuration_version.tokens';

@Injectable()
export class ListConfigurationVersionUseCase {
  constructor(
    @Inject(IConfigurationVersionRepositoryToken)
    private readonly configurationVersionRepository: IConfigurationVersionRepository,
  ) {}

  async execute() {
    return await this.configurationVersionRepository.listConfigurations();
  }
}
