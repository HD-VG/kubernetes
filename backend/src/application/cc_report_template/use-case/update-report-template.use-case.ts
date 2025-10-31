/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { UpdateReportTemplateDto } from 'src/presentation/dtos/cc_report_template/index.dto';
import { IReportTemplateRepositoryToken } from '../tokens/report-template-repository.token';

@Injectable()
export class UpdateTransportUseCase {
  constructor(
    @Inject(IReportTemplateRepositoryToken)
    private readonly reportTemplateRepository: IReportTemplateRepository,
  ) {}

  async execute(id: number, dto: UpdateReportTemplateDto, userId: number) {
    return await this.reportTemplateRepository.update(id, dto, userId);
  }
}
