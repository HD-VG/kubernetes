/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IStandardRepositoryToken } from '../tokens/standard-repository.tokens';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class DeleteStandardUseCase {
  constructor(
    @Inject(IStandardRepositoryToken)
    private readonly standardRepository: IStandardRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.standardRepository.delete(dto, userId);
  }
}
