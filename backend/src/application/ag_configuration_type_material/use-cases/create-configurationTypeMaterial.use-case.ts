/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { IConfigurationTypeMaterialToken } from '../tokens/configuration_type_material.tokens';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class CreateConfigurationTypeMaterialUseCase {
  constructor(
    @Inject(IConfigurationTypeMaterialToken)
    private readonly configurationTypeMaterialRepository: IConfigurationTypeMaterialRepository,
  ) {}

  async execute(createMaterialDto: CreateConfigurationTypeMaterialDto, userId: FindById) {
    return this.configurationTypeMaterialRepository.create(createMaterialDto, userId);
  }
}
