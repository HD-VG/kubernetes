/* eslint-disable prettier/prettier */
import { DeleteApplicantUseCase } from './index-applicant.use-case';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteApplicantUseCase', () => {
  let useCase: DeleteApplicantUseCase;
  let repository: IApplicantRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteApplicantUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                entityName: 'ELAPAS',
                location: 'Lima',
                phone: '123456789',
                referencePerson: 'Juan Perez',
                chainOfCustody: 5,
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});