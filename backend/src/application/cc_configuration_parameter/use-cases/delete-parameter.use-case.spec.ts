/* eslint-disable prettier/prettier */
import { DeleteParameterUseCase } from './index.use-case';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteParameterUseCase', () => {
  let useCase: DeleteParameterUseCase;
  let repository: IParameterRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteParameterUseCase(repository);
  });


  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                name: 'pH',
                unit: 'mg/L',
                testMethod: 'Colorimetry',
                testCode: 'PH001',
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});