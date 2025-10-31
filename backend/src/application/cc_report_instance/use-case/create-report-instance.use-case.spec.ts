/* eslint-disable prettier/prettier */
import { CreateReportInstanceUseCase } from 'src/application/cc_report_instance/use-case/create-report-instance.use-case';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { CreateReportInstanceDto } from 'src/presentation/dtos/cc_report_instance/index.dto';
import { TestType } from 'src/domain/cc_report_instance/enum/test_type';
import { WaterTypeCode } from 'src/domain/cc_report_instance/enum/water_code';

describe('CreateReportInstanceUseCase', () => {
  let useCase: CreateReportInstanceUseCase;
  let repository: IReportInstanceRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateReportInstanceUseCase(repository);
  });

  it('should call repository.create with dto and userId, and return result', async () => {
    const dto: CreateReportInstanceDto = {
      chainOfCustody: 1,
      testType: TestType.FQ,
      waterCode: WaterTypeCode.AC,
      codeCustody: 'CUST-001',
      reportCode: 'REP-2025-001',
      reportYear: 2025,
      summary: { ph: 7.2, turbidity: 3.1 },
      statusReport: 'GENERATED',
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Reporte creado' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});