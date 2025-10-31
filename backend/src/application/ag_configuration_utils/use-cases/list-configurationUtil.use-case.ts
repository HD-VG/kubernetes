/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationUtilToken } from '../tokens/configuration_utils.tockens';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ListConfigurationUtilUseCase {
  constructor(
    @Inject(IConfigurationUtilToken)
    private readonly configurationUtilRepository: IConfigurationUtilRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return this.configurationUtilRepository.list(paginationDto);
  }
}
