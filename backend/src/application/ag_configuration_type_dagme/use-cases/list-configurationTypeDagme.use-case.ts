/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeDagmeToken } from '../tokens/configuration_type_dagme.tokens';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class ListConfigurationTypeDagmeUseCase {
  constructor(
    @Inject(IConfigurationTypeDagmeToken)
    private readonly configurationTypeDagmeRepository: IConfigurationTypeDagmeRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return await this.configurationTypeDagmeRepository.list(paginationDto);
  }
}
