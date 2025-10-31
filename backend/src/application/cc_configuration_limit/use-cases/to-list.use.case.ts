/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ILimitRepositoryToken } from '../tokens/limit-repository.tokens';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';

@Injectable()
export class ToListLimitUseCase {
  constructor(
    @Inject(ILimitRepositoryToken)
    private readonly limitRepository: ILimitRepository,
  ) {}

  async execute() {
    return await this.limitRepository.toConfiguration();
  }
}
