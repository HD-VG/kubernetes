/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { CreateTestResultDto } from 'src/presentation/dtos/cc_test_result/index.dto';
import { ITestResultRepositoryToken } from '../tokens/test-result-repository.tokens';

@Injectable()
export class CreateTestResultUseCase {
  constructor(
    @Inject(ITestResultRepositoryToken)
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async execute(dto: CreateTestResultDto, userId: number) {
    return await this.testResultRepository.create(dto, userId);
  }
}
