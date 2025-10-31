/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeMaterialToken } from '../tokens/configuration_type_material.tokens';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class DeleteConfigurationTypeMaterialUseCase {
  constructor(
    @Inject(IConfigurationTypeMaterialToken)
    private readonly configurationTypeMaterialRepository: IConfigurationTypeMaterialRepository,
  ) {}

  async execute(deleteMaterialDto: FindByUuid, userId: FindById) {
    return this.configurationTypeMaterialRepository.delete(deleteMaterialDto,userId);
  }
}
