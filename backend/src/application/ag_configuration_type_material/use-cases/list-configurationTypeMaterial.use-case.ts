/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeMaterialToken } from '../tokens/configuration_type_material.tokens';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ListConfigurationTypeMaterialUseCase {
  constructor(
    @Inject(IConfigurationTypeMaterialToken)
    private readonly configurationTypeMaterialRepository: IConfigurationTypeMaterialRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return this.configurationTypeMaterialRepository.list(paginationDto);
  }
}
