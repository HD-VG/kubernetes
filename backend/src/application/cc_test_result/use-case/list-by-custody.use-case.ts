/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { ITestResultRepositoryToken } from '../tokens/test-result-repository.tokens';
import { ListTestResultDto } from 'src/presentation/dtos/cc_test_result/list-by-custody-sampling.dto';

@Injectable()
export class ListByCustodyTestResultUseCase {
  constructor(
    @Inject(ITestResultRepositoryToken)
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async execute(dto: ListTestResultDto) {
    return await this.testResultRepository.listByCusdtody(dto);
  }
}
