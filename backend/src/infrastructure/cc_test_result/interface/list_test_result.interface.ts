/* eslint-disable prettier/prettier */
export class ParameterResultDto {
  id_test: number;
  parameter: string;
  valueA: number | null;
  valueB: number | null;
  average: number | null;
  result: number | null;
  usedFormula?: boolean;
  configuration: string | null;
  createAt: Date;
}

export class TestResultFlatDto {
  custody_id: number;
  codeCustody: string;
  sampling_id: number;
  sampleCode: string;
  typeCode: string;
  description: string;
  sourceOfSupply: string;
  samplingDay: Date;
  samplingTime: string;
  samplingTechnique: string;
  coordinatesX: string;
  coordinatesY: string;
  condAmbT: number;
  condAmbB: number;

  turbiedad: ParameterResultDto | null;
  ph: ParameterResultDto | null;
  conductividad_electrica: ParameterResultDto | null;
  cloro_residual: ParameterResultDto | null;
}
