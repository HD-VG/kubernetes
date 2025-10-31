/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { IConfigurationTypeMaterialToken } from '../tokens/configuration_type_material.tokens';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { FindByUuid,FindById } from 'src/common/dto/index.dto';

@Injectable()
export class UpdateConfigurationTypeMaterialUseCase {
  constructor(
    @Inject(IConfigurationTypeMaterialToken)
    private readonly configurationTypeMaterialRepository: IConfigurationTypeMaterialRepository,
  ) {}

  async execute(updateMaterialId:FindByUuid, updateMaterialDto: UpdateConfigurationTypeMaterialDto, userId: FindById) {
    return this.configurationTypeMaterialRepository.update(updateMaterialId,updateMaterialDto,userId);
  }
}
