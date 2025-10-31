/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { IConfigurationTypeDagmeToken } from '../tokens/configuration_type_dagme.tokens';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';

@Injectable()
export class UpdateConfigurationTypeDagmeUseCase {
  constructor(
    @Inject(IConfigurationTypeDagmeToken)
    private readonly configurationTypeDagmeRepository: IConfigurationTypeDagmeRepository,
  ) {}

  async execute(updateDagmeId:FindByUuid ,updateDagmeDto: UpdateConfigurationTypeDagmeDto, userId: FindById) {
    return this.configurationTypeDagmeRepository.update(updateDagmeId, updateDagmeDto, userId);
  }
}
