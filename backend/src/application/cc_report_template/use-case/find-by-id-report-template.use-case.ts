/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { IReportTemplateRepositoryToken } from '../tokens/report-template-repository.token';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class FindReportTemplateUseCase {
  constructor(
    @Inject(IReportTemplateRepositoryToken)
    private readonly reportTemplateRepository: IReportTemplateRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.reportTemplateRepository.findById(dto);
  }
}
