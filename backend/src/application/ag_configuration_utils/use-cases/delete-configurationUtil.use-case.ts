/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationUtilToken } from '../tokens/configuration_utils.tockens';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class DeleteConfigurationUtilUseCase {
  constructor(
    @Inject(IConfigurationUtilToken)
    private readonly configurationUtilRepository: IConfigurationUtilRepository,
  ) {}

  async execute(deleteUtilId: FindByUuid, userId: FindById) {
    return this.configurationUtilRepository.delete(deleteUtilId,userId);
  }
}
