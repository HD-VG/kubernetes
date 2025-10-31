/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { FindById } from 'src/common/dto/index.dto';
import { IConfigurationVersionRepositoryToken } from '../tokens/configuration_version.tokens';

@Injectable()
export class ModifyStatusConfigurationVersionUseCase {
  constructor(
    @Inject(IConfigurationVersionRepositoryToken)
    private readonly configurationVersionRepository: IConfigurationVersionRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.configurationVersionRepository.modify_status(dto, userId);
  }
}
