/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeMaterialToken } from '../tokens/configuration_type_material.tokens';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';

@Injectable()
export class FindAllDataConfigurationTypeMaterialUseCase {
  constructor(
    @Inject(IConfigurationTypeMaterialToken)
    private readonly configurationTypeMaterialRepository: IConfigurationTypeMaterialRepository,
  ) {}

  async execute() {
    return this.configurationTypeMaterialRepository.findAllData();
  }
}
