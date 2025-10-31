/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationUexpDto } from 'src/presentation/dtos/cc_configuration_uexp/update-configuration_uexp.dto';
import { IConfigurationUexpRepositoryToken } from '../tokens/configuration-uexp-repository.tokens';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';

@Injectable()
export class UpdateConfigurationUexpUseCase {
  constructor(
    @Inject(IConfigurationUexpRepositoryToken)
    private readonly configurationUexp: IConfigurationUexpRepository,
  ) {}

  async execute(id: number, dto: UpdateConfigurationUexpDto, userId: number) {
    return this.configurationUexp.update(id, dto, userId);
  }
}
