/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeMachineToken } from '../tokens/configuration_type_machine.tokens';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';

@Injectable()
export class DeleteConfigurationTypeMachineUseCase {
  constructor(
    @Inject(IConfigurationTypeMachineToken)
    private readonly configurationTypeMachineRepository: IConfigurationTypeMachineRepository,
  ) {}

  async execute(deleteMachineId: FindByUuid, userId : FindById) {
    return this.configurationTypeMachineRepository.delete(deleteMachineId, userId);
  }
}
