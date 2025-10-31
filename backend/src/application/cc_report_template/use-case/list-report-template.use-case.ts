/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { IReportTemplateRepositoryToken } from '../tokens/report-template-repository.token';

@Injectable()
export class ListReportTemplateUseCase {
  constructor(
    @Inject(IReportTemplateRepositoryToken)
    private readonly reportTemplateRepository: IReportTemplateRepository,
  ) {}

  async execute(codeCustody: string) {
    return await this.reportTemplateRepository.list(codeCustody);
  }
}
