/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { UpdateAdminConfigurationDto } from 'src/presentation/dtos/cc_configuration_version/index.dto';
import { IConfigurationVersionRepositoryToken } from '../tokens/configuration_version.tokens';

@Injectable()
export class UpdateConfigurationVersionUseCase {
  constructor(
    @Inject(IConfigurationVersionRepositoryToken)
    private readonly configurationVersionRepository: IConfigurationVersionRepository,
  ) {}

  async execute(id:number, dto: UpdateAdminConfigurationDto, userId: number) {
    return await this.configurationVersionRepository.update(id, dto, userId);
  }
}
