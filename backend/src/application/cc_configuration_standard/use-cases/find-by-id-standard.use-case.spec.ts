/* eslint-disable prettier/prettier */
import { FindByIdtStandardUseCase } from './index.use-case';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdtStandardUseCase', () => {
  let useCase: FindByIdtStandardUseCase;
  let repository: IStandardRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdtStandardUseCase(repository);
  });

  it('should call repository.findById with correct Standards', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1, 
                name: 'ISO 9001', 
                type: 'Quality'
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});