/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { CreateReportTemplateDto } from 'src/presentation/dtos/cc_report_template/index.dto';
import { IReportTemplateRepositoryToken } from '../tokens/report-template-repository.token';

@Injectable()
export class CreateReportTemplateUseCase {
  constructor(
    @Inject(IReportTemplateRepositoryToken)
    private readonly reportTemplateRepository: IReportTemplateRepository,
  ) {}

  async execute(dto: CreateReportTemplateDto, userId: number) {
    return await this.reportTemplateRepository.create(dto, userId);
  }
}
