/* eslint-disable prettier/prettier */
import { ListReportTemplateUseCase } from 'src/application/cc_report_template/use-case/list-report-template.use-case';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';

describe('ListReportTemplateUseCase', () => {
  let useCase: ListReportTemplateUseCase;
  let repository: IReportTemplateRepository;

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    } as any;

    useCase = new ListReportTemplateUseCase(repository);
  });

  it('should call repository.list with codeCustody and return result', async () => {
    const codeCustody = 'CUST-001';
    const expectedResult = {
      status: true,
      message: 'Plantillas listadas',
      data: [
        {
          id: 1,
          codeCustody: 'CUST-001',
          typeCode: 'agua_potable',
          name: 'Informe Agua Potable',
          expectedParameters: ['pH', 'Turbidez'],
          statusReport: true,
        },
      ],
    };

    (repository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(codeCustody);

    expect(repository.list).toHaveBeenCalledWith(codeCustody);
    expect(result).toEqual(expectedResult);
  });
});