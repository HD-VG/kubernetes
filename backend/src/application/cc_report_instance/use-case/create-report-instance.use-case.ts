/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { CreateReportInstanceDto } from 'src/presentation/dtos/cc_report_instance/index.dto';
import { IReportInstanceRepositoryToken } from '../tokens/report-instance-repository.token';

@Injectable()
export class CreateReportInstanceUseCase {
  constructor(
    @Inject(IReportInstanceRepositoryToken)
    private readonly reportInstanceRepository: IReportInstanceRepository,
  ) {}

  async execute(dto: CreateReportInstanceDto, userId: number) {
    return await this.reportInstanceRepository.create(dto, userId);
  }
}
