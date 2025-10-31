/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IParameterRepositoryToken } from '../tokens/parameter-repository.tokens';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { UpdateParameterDto } from 'src/presentation/dtos/cc_configuration_parameter/update-parameter.dto';

@Injectable()
export class UpdateParameterUseCase {
  constructor(
    @Inject(IParameterRepositoryToken)
    private readonly parameterRepository: IParameterRepository,
  ) {}

  async execute(id: number, dto: UpdateParameterDto, userId: number) {
    return await this.parameterRepository.update(id, dto, userId);
  }
}
