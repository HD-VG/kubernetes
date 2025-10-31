/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { IReportInstanceRepositoryToken } from '../tokens/report-instance-repository.token';

@Injectable()
export class DeleteReportInstanceUseCase {
  constructor(
    @Inject(IReportInstanceRepositoryToken)
    private readonly reportInstanceRepository: IReportInstanceRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.reportInstanceRepository.delete(dto, userId);
  }
}
