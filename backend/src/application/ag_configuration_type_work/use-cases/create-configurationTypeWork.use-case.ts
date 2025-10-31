/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { IConfigurationTypeWorkToken } from '../tokens/configuration_type_work.tokens';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class CreateConfigurationTypeWorkUseCase {
  constructor(
    @Inject(IConfigurationTypeWorkToken)
    private readonly configurationTypeWorkRepository: IConfigurationTypeWorkRepository,
  ) {}

  async execute(createWorkDto: CreateConfigurationTypeWorkDto, userId: FindById) {
    return this.configurationTypeWorkRepository.create(createWorkDto, userId);
  }
}
