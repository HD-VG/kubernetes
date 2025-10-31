/* eslint-disable prettier/prettier */
import { UpdateApplicantUseCase } from './update-applicant.use-case';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { UpdateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';

describe('UpdateApplicantUseCase', () => {
  let useCase: UpdateApplicantUseCase;
  let repository: IApplicantRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateApplicantUseCase(repository);
  });

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateApplicantDto = {
      id: 1,
      entityName: 'ELAPAS',
      location: 'Lima',
      phone: '123456789',
      referencePerson: 'Juan Perez',
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});