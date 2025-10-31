/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { IConfigurationTypeWorkToken } from '../tokens/configuration_type_work.tokens';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

@Injectable()
export class UpdateConfigurationTypeWorkUseCase {
  constructor(
    @Inject(IConfigurationTypeWorkToken)
    private readonly configurationTypeWorkRepository: IConfigurationTypeWorkRepository,
  ) {}

  async execute(deleteWorkId:FindByUuid, updateWorkDto: UpdateConfigurationTypeWorkDto, userId: FindById) {
    return this.configurationTypeWorkRepository.update(deleteWorkId,updateWorkDto,userId);
  }
}
