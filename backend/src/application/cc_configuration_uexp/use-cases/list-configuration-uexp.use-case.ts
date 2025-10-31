/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationUexpRepositoryToken } from '../tokens/configuration-uexp-repository.tokens';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';

@Injectable()
export class ListConfigurationUexpUseCase {
  constructor(
    @Inject(IConfigurationUexpRepositoryToken)
    private readonly configurationUexp: IConfigurationUexpRepository,
  ) {}

  async execute() {
    return await this.configurationUexp.list();
  }
}
