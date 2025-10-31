/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeMachineToken } from '../tokens/configuration_type_machine.tokens';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ListConfigurationTypeMachineUseCase {
  constructor(
    @Inject(IConfigurationTypeMachineToken)
    private readonly configurationTypeMachineRepository: IConfigurationTypeMachineRepository,
  ) {}

  async execute(paginationDto: PaginationDto) {
    return this.configurationTypeMachineRepository.list(paginationDto);
  }
}
