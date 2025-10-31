/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { IConfigurationTypeMachineToken } from '../tokens/configuration_type_machine.tokens';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';

@Injectable()
export class UpdateConfigurationTypeMachineUseCase {
  constructor(
    @Inject(IConfigurationTypeMachineToken)
    private readonly configurationTypeMachineRepository: IConfigurationTypeMachineRepository,
  ) {}

  async execute(updateMachineId: FindByUuid,updateMachineDto: UpdateConfigurationTypeMachineDto, userId : FindById ) {
    return this.configurationTypeMachineRepository.update(updateMachineId,updateMachineDto,userId);
  }
}
 