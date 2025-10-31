/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { IReportInstanceRepositoryToken } from 'src/application/cc_report_instance/tokens/report-instance-repository.token';

@Injectable()
export class ReportInstanceService {
  constructor(
    @Inject('IReportInstanceRepository')
    @Inject(IReportInstanceRepositoryToken)
    private readonly reportInstanceRepository: IReportInstanceRepository,
  ) { }

  getYear(): number {
    const fechaActual: Date = new Date();
    const anioActual: number = fechaActual.getFullYear();
    return anioActual
  }

  getTypeAbbreviation(type: string): Promise<string> {
    const map = {
      AGUA_TRATADA: 'AT',
      AGUA_CRUDA: 'AC',
      AGUA_RESIDUAL: 'AR',
      LODO: 'LD',
    };
    return map[type] || '';
  }

  async generateCodes(
    testType: 'MB' | 'FQ' | 'BQ',
    waterCode: 'AT' | 'AC' | 'AR' | 'LD',
    year: number
  ): Promise<{ reportCode: string; test_number: string }> {
    const count = await this.reportInstanceRepository.count({
      where: {
        testType,
        waterCode,
        reportYear: year,
      },
    });

    const correlativo = String(count + 1).padStart(2, '0'); // 02
    const ensayo = String(count + 1).padStart(3, '0'); // 015

    return {
      reportCode: `${testType}-${waterCode}-${correlativo}/${year}`,
      test_number: `${ensayo}/${year}`,
    };
  }

}
