/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IParameterRepositoryToken } from '../tokens/parameter-repository.tokens';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class DeleteParameterUseCase {
  constructor(
    @Inject(IParameterRepositoryToken)
    private readonly parameterRepository: IParameterRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.parameterRepository.delete(dto, userId);
  }
}
