/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IParameterRepositoryToken } from '../tokens/parameter-repository.tokens';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';

@Injectable()
export class ListParameterUseCase {
  constructor(
    @Inject(IParameterRepositoryToken)
    private readonly parameterRepository: IParameterRepository,
  ) {}

  async execute() {
    return await this.parameterRepository.list();
  }
}
