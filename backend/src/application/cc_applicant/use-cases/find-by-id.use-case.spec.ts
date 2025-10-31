/* eslint-disable prettier/prettier */
import { FindByIdApplicantUseCase } from './index-applicant.use-case';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdApplicantUseCase', () => {
  let useCase: FindByIdApplicantUseCase;
  let repository: IApplicantRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdApplicantUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
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

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});