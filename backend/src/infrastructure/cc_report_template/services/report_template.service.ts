/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MeasuredParameters } from 'src/domain/cc_report_template/value-objects/parameter_list.value-objects';
import { ReportTemplate, TestResult } from 'src/domain/shared/index.entity';

@Injectable()
export class ReportTemplateService {
  validateMatch(template: ReportTemplate, results: TestResult[]): boolean {
    const measuredParams = new MeasuredParameters(results.map(r => r.parameter));
    return measuredParams.includesAll(template.expectedParameters);
  }

}
