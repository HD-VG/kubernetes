/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { IConfigurationUtilToken } from '../tokens/configuration_utils.tockens';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
Injectable()
export class UpdateConfigurationUtilUseCase {
  constructor(
    @Inject(IConfigurationUtilToken)
    private readonly configurationUtilRepository: IConfigurationUtilRepository,
  ) {}

  async execute(updateUtilId:FindByUuid, updateUtilDto: UpdateConfigurationUtilDto, userId: FindById) {
    return this.configurationUtilRepository.update(updateUtilId,updateUtilDto,userId);
  }
}
