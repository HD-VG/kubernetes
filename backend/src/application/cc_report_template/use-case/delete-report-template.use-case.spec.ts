/* eslint-disable prettier/prettier */
import { DeleteReportTemplateUseCase } from './index-use-case';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteReportTemplateUseCase', () => {
  let useCase: DeleteReportTemplateUseCase;
  let repository: IReportTemplateRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteReportTemplateUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
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

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});