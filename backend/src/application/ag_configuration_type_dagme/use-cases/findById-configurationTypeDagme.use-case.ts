/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeDagmeToken } from '../tokens/configuration_type_dagme.tokens';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class FindByConfigurationTypeDagmeUseCase {
  constructor(
    @Inject(IConfigurationTypeDagmeToken)
    private readonly configurationTypeDagmeRepository: IConfigurationTypeDagmeRepository,
  ) {}

  async execute(viewDagmeId: FindByUuid) {
    return await this.configurationTypeDagmeRepository.findOne(viewDagmeId);
  }
}
