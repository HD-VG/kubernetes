/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigurationUexpDto } from 'src/presentation/dtos/cc_configuration_uexp/create-configuration_uexp.dto';
import { IConfigurationUexpRepositoryToken } from '../tokens/configuration-uexp-repository.tokens';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';

@Injectable()
export class CreateConfigurationUexpUseCase {
  constructor(
    @Inject(IConfigurationUexpRepositoryToken)
    private readonly configurationUexp: IConfigurationUexpRepository,
  ) {}

  async execute(dto: CreateConfigurationUexpDto, userId: number) {
    return this.configurationUexp.create(dto, userId);
  }
}
