/* eslint-disable prettier/prettier */
import { UpdateTransportUseCase } from './index-use-case';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { UpdateReportTemplateDto } from 'src/presentation/dtos/cc_report_template/index.dto';

describe('UpdateTransportUseCase', () => {
  let useCase: UpdateTransportUseCase;
  let repository: IReportTemplateRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateTransportUseCase(repository);
  });

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateReportTemplateDto = {
      id: 1,
          codeCustody: 'CUST-001',
          typeCode: 'agua_potable',
          name: 'Informe Agua Potable',
          expectedParameters: ['pH'],
          codeReport: 'REP-001',
          statusReport: true,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});