/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IParameterRepositoryToken } from '../tokens/parameter-repository.tokens';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { CreateParameterDto } from 'src/presentation/dtos/cc_configuration_parameter/create-parameter.dto';

@Injectable()
export class CreateParameterUseCase {
  constructor(
    @Inject(IParameterRepositoryToken)
    private readonly parameterRepository: IParameterRepository,
  ) {}

  async execute(dto: CreateParameterDto, userId: number) {
    return this.parameterRepository.create(dto, userId);
  }
}
