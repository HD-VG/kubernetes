/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeDagmeToken } from '../tokens/configuration_type_dagme.tokens';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';

@Injectable()
export class FindAllDataConfigurationTypeDagmeUseCase {
  constructor(
    @Inject(IConfigurationTypeDagmeToken)
    private readonly configurationTypeDagmeRepository: IConfigurationTypeDagmeRepository,
  ) {}

  async execute() {
    return await this.configurationTypeDagmeRepository.findAllData();
  }
}
