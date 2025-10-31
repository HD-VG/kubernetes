/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { CreateSamplingDto } from 'src/presentation/dtos/cc_sampling/index.dto';
import { ISamplingRepositoryToken } from '../tokens/sampling-repository.tokens';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface'

@Injectable()
export class CreateSamplingUseCase {
  constructor(
    @Inject(ISamplingRepositoryToken)
    private readonly samplingRepository: ISamplingRepository,
  ) {}

  async execute(dto: CreateSamplingDto, userId: number) {
    return await this.samplingRepository.create(dto, userId);
  }
}
