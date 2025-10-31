/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { IConfigurationUtilToken } from '../tokens/configuration_utils.tockens';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { FindById } from 'src/common/dto/findById.dto';
@Injectable()
export class CreateConfigurationUtilUseCase {
  constructor(
    @Inject(IConfigurationUtilToken)
    private readonly configurationUtilRepository: IConfigurationUtilRepository,
  ) {}

  async execute(createUtilDto: CreateConfigurationUtilDto, userId: FindById) {
    return this.configurationUtilRepository.create(createUtilDto, userId);
  }
}
