/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IStandardRepositoryToken } from '../tokens/standard-repository.tokens';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';

@Injectable()
export class ListStandardUseCase {
  constructor(
    @Inject(IStandardRepositoryToken)
    private readonly standardRepository: IStandardRepository,
  ) {}

  async execute() {
    return await this.standardRepository.list();
  }
}
