/* eslint-disable prettier/prettier */
import { ListReportInstanceUseCase } from 'src/application/cc_report_instance/use-case/list.report-instence.use-case';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('ListReportInstanceUseCase', () => {
  let useCase: ListReportInstanceUseCase;
  let repository: IReportInstanceRepository;

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    } as any;

    useCase = new ListReportInstanceUseCase(repository);
  });

  it('should call repository.list with FindById dto and return result', async () => {
    const dto: FindById = { id: 1 };
    const expectedResult = {
      status: true,
      message: 'Instancias de reporte listadas',
      data: [
        {
          id: 1,
          chainOfCustody: 1,
          testType: 'FISICOQUIMICO',
          waterCode: 'SUPERFICIAL',
          reportCode: 'REP-2025-001',
        },
      ],
    };

    (repository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.list).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});