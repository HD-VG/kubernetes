/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { UpdateSamplingDto } from 'src/presentation/dtos/cc_sampling/index.dto';
import { ISamplingRepositoryToken } from '../tokens/sampling-repository.tokens';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface'

@Injectable()
export class UpdateSamplingUseCase {
  constructor(
    @Inject(ISamplingRepositoryToken)
    private readonly samplingRepository: ISamplingRepository,
  ) {}

  async execute(id: number, dto: UpdateSamplingDto, userId: number) {
    return await this.samplingRepository.update(id, dto, userId);
  }
}
