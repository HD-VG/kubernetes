/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IConfigurationTypeDagmeToken } from '../tokens/configuration_type_dagme.tokens';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class DeleteConfigurationTypeDagmeUseCase {
  constructor(
    @Inject(IConfigurationTypeDagmeToken)
    private readonly configurationTypeDagmeRepository: IConfigurationTypeDagmeRepository,
  ) {}

  async execute(deleteDagmeId: FindByUuid,userId: FindById) {
    return await this.configurationTypeDagmeRepository.delete(deleteDagmeId,userId);
  }
}
