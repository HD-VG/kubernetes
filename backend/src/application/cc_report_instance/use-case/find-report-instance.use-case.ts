/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { IReportInstanceRepositoryToken } from '../tokens/report-instance-repository.token';
import { Response } from 'express';
import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/header-info.dto';
import { GenerateReportDto } from 'src/common/dto/findToPrint.dto';
@Injectable()
export class FindReportInstanceUseCase {
  constructor(
    @Inject(IReportInstanceRepositoryToken)
    private readonly reportInstanceRepository: IReportInstanceRepository,
  ) { }

  async execute(res: Response, dto: GenerateReportDto) {
    const data = await this.reportInstanceRepository.printReportInstancePDF(dto)
    const header: AdminConfigurationDTO = await this.reportInstanceRepository.generateHeaderInfo(data.summary.configurationVersion.id);
    const pdfBuffer = await this.reportInstanceRepository.generarPdfConHeaderAndFooter(data, data.summary, header, dto);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="reporte_control_calidad_${data.codeCustody}_Control_minimo_agua_potable.pdf"`);
    res.setHeader('X-Filename', `reporte_control_calidad_${data.codeCustody}_Control_minimo_agua_potable.pdf`);
    res.send(pdfBuffer);
  }
}
