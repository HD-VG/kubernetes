/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { FindById } from 'src/common/dto/index.dto';
import { IReportTemplateRepositoryToken } from '../tokens/report-template-repository.token';

@Injectable()
export class DeleteReportTemplateUseCase {
  constructor(
    @Inject(IReportTemplateRepositoryToken)
    private readonly reportTemplateRepository: IReportTemplateRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.reportTemplateRepository.delete(dto, userId);
  }
}
