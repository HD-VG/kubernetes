/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeWorkToken } from '../tokens/configuration_type_work.tokens';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class FindByConfigurationTypeWorkUseCase {
  constructor(
    @Inject(IConfigurationTypeWorkToken)
    private readonly configurationTypeWorkRepository: IConfigurationTypeWorkRepository,
  ) {}

  async execute(viewWorkId:FindByUuid) {
    return this.configurationTypeWorkRepository.findOne(viewWorkId);
  }
}
