/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IParameterRepositoryToken } from '../tokens/parameter-repository.tokens';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class FindByIdParameterUseCase {
  constructor(
    @Inject(IParameterRepositoryToken)
    private readonly parameterRepository: IParameterRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.parameterRepository.findById(dto);
  }
}
