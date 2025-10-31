/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { ConfigurationCalculation, ConfigurationLimit } from 'src/domain/shared/index.entity';
import { MeasurementPair } from 'src/domain/cc_test_result/value-objects/measurementPair.value-objects';

@Injectable()
export class TestResultService {
  calculate(
    pair: MeasurementPair,
    config?: ConfigurationCalculation,
  ): { result: number; usedFormula: boolean } {
    const avg = pair.average;

    if (config?.approvedByApps && config.formula?.includes('x')) {
      try {
        const result = evaluate(config.formula, { x: avg });
        return { result, usedFormula: true };
      } catch {
        return { result: avg, usedFormula: false };
      }
    }

    return { result: avg, usedFormula: false };
  }
  parseConfigurationId(idString: string): { limitId: number; parameterId?: number; standardId?: number } {
    const [limit, parameter, standard] = idString.split('_');

    return {
      limitId: Number(limit),
      parameterId: parameter ? Number(parameter) : undefined,
      standardId: standard ? Number(standard) : undefined,
    };
  }
  testResultParameter(data: ConfigurationLimit){
    if(data.minValue && data.maxValue) {
      
    }
  }

}
