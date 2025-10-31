/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface';
import { FindById } from 'src/common/dto/index.dto';
import { ISamplingRepositoryToken } from '../tokens/sampling-repository.tokens';

@Injectable()
export class DeleteSamplingUseCase {
  constructor(
    @Inject(ISamplingRepositoryToken)
    private readonly samplingRepository: ISamplingRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.samplingRepository.delete(dto, userId);
  }
}
