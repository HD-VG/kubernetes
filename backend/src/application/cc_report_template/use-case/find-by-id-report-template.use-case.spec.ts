/* eslint-disable prettier/prettier */
import { FindReportTemplateUseCase } from './index-use-case';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindReportTemplateUseCase', () => {
  let useCase: FindReportTemplateUseCase;
  let repository: IReportTemplateRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindReportTemplateUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                codeCustody: 'CUST-001',
                typeCode: 'agua_potable',
                codeReport: 'REP-001',
                name: 'Informe Agua Potable',
                expectedParameters: ['pH', 'Turbidez', 'Conductividad'],
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});