/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { ITestResultRepositoryToken } from '../tokens/test-result-repository.tokens';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class FindByIdTestResultUseCase {
  constructor(
    @Inject(ITestResultRepositoryToken)
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.testResultRepository.findById(dto);
  }
}
