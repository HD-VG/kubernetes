/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationUexpRepositoryToken } from '../tokens/configuration-uexp-repository.tokens';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class FindByIdtConfigurationUexpUseCase {
  constructor(
    @Inject(IConfigurationUexpRepositoryToken)
    private readonly configurationUexp: IConfigurationUexpRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.configurationUexp.findById(dto);
  }
}
