/* eslint-disable prettier/prettier */
import { CreateApplicantUseCase } from './create-applicant.use-case';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { CreateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';

describe('CreateApplicantUseCase', () => {
  let useCase: CreateApplicantUseCase;
  let repository: IApplicantRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateApplicantUseCase(repository);
  });

  it('should call repository.create with correct parameters', async () => {
    const dto: CreateApplicantDto = {
      entityName: 'ELAPAS',
      location: 'Lima',
      phone: '123456789',
      referencePerson: 'Juan Perez',
      chainOfCustody: 5,
      // otros campos si los hay
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro creado' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});