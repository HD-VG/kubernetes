/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { IConfigurationTypeDagmeToken } from '../tokens/configuration_type_dagme.tokens';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class CreateConfigurationTypeDagmeUseCase {
  constructor(
    @Inject(IConfigurationTypeDagmeToken)
    private readonly configurationTypeDagmeRepository: IConfigurationTypeDagmeRepository,
  ) {}

  async execute(createDagmeDto: CreateConfigurationTypeDagmeDto, userId: FindById) {
    return this.configurationTypeDagmeRepository.create(createDagmeDto, userId);
  }
}
