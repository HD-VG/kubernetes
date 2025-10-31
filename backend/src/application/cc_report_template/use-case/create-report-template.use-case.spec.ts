/* eslint-disable prettier/prettier */
import { CreateReportTemplateUseCase } from 'src/application/cc_report_template/use-case/create-report-template.use-case';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';
import { CreateReportTemplateDto } from 'src/presentation/dtos/cc_report_template/index.dto';

describe('CreateReportTemplateUseCase', () => {
  let useCase: CreateReportTemplateUseCase;
  let repository: IReportTemplateRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateReportTemplateUseCase(repository);
  });

  it('should call repository.create with dto and userId, and return result', async () => {
    const dto: CreateReportTemplateDto = {
      codeCustody: 'CUST-001',
      typeCode: 'agua_potable',
      codeReport: 'REP-001',
      name: 'Informe Agua Potable',
      expectedParameters: ['pH', 'Turbidez', 'Conductividad'],
      statusReport: true,
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Plantilla de reporte creada' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});