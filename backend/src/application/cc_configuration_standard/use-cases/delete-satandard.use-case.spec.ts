/* eslint-disable prettier/prettier */
import { DeleteStandardUseCase } from './index.use-case';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteStandardUseCase', () => {
  let useCase: DeleteStandardUseCase;
  let repository: IStandardRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteStandardUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1, 
                name: 'ISO 9001', 
                type: 'Quality'
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});