/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeMaterialToken } from '../tokens/configuration_type_material.tokens';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class FindByConfigurationTypeMaterialUseCase {
  constructor(
    @Inject(IConfigurationTypeMaterialToken)
    private readonly configurationTypeMaterialRepository: IConfigurationTypeMaterialRepository,
  ) {}

  async execute(viewMaterialId:FindByUuid) {
    return this.configurationTypeMaterialRepository.findOne(viewMaterialId);
  }
}
