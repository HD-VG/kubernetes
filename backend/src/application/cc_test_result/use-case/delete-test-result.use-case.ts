/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { ITestResultRepositoryToken } from '../tokens/test-result-repository.tokens';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class DeleteTestResultUseCase {
  constructor(
    @Inject(ITestResultRepositoryToken)
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.testResultRepository.delete(dto, userId);
  }
}
