/* eslint-disable prettier/prettier */
import { FindByIdParameterUseCase } from './index.use-case';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdParameterUseCase', () => {
  let useCase: FindByIdParameterUseCase;
  let repository: IParameterRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdParameterUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: 'pH',
                unit: 'mg/L',
                testMethod: 'Colorimetry',
                testCode: 'PH001',
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});