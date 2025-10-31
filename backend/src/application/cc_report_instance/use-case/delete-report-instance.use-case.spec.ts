/* eslint-disable prettier/prettier */
import { DeleteReportInstanceUseCase } from './index.use-case';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { TestType } from 'src/domain/cc_report_instance/enum/test_type';
import { WaterTypeCode } from 'src/domain/cc_report_instance/enum/water_code';
describe('DeleteReportInstanceUseCase', () => {
  let useCase: DeleteReportInstanceUseCase;
  let repository: IReportInstanceRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteReportInstanceUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                chainOfCustody: 1,
                testType: TestType.FQ,
                waterCode: WaterTypeCode.AC,
                codeCustody: 'CUST-001',
                reportCode: 'REP-2025-001',
                reportYear: 2025,
                summary: { ph: 7.2, turbidity: 3.1 },
                statusReport: 'GENERATED',
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});