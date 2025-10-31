/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminConfigurationDto, UpdateAdminConfigurationDto } from 'src/presentation/dtos/cc_configuration_version/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { IConfigurationVersionRepositoryToken } from 'src/application/cc_configuration_version/tokens/configuration_version.tokens';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';

@Injectable()
export class ConfigurationVersionService {
  constructor(
    @Inject('IConfigurationVersionRepository')
    @Inject(IConfigurationVersionRepositoryToken)
    private readonly configurationVersionRepository: IConfigurationVersionRepository,
  ) { }
  private async validateExistsOrThrow(id: number): Promise<AnswerQuery> {
    const entity = await this.configurationVersionRepository.findOne(id);
    if (!entity) {
      return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
    }
    return entity;
  }
  async create(
    createAdminConfigurationDto: CreateAdminConfigurationDto,
    userId: number,
  ) {
    await this.configurationVersionRepository.disabled();
    return await this.configurationVersionRepository.create(
      createAdminConfigurationDto,
      userId,
    );
  }

  async findAll() {
    return await this.configurationVersionRepository.listConfigurations();
  }

  async findById(id: FindById) {
    return await this.configurationVersionRepository.findById(id);
  }

  async update(
    id: number,
    updateAdminConfigurationDto: UpdateAdminConfigurationDto,
    userId: number,
  ) {
    await this.validateExistsOrThrow(id);
    return await this.configurationVersionRepository.update(
      id,
      updateAdminConfigurationDto,
      userId,
    );
  }

  async modify_status(id: FindById, userId: number) {
    await this.validateExistsOrThrow(id.id);
    return await this.configurationVersionRepository.modify_status(id, userId);
  }

  async remove(id: FindById, userId: number) {
    await this.validateExistsOrThrow(id.id);
    return await this.configurationVersionRepository.delete(id, userId);
  }
}
