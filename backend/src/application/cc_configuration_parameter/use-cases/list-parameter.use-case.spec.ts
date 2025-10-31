/* eslint-disable prettier/prettier */
import { ListParameterUseCase } from 'src/application/cc_configuration_parameter/use-cases/list-parameter.use-case';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';

describe('ListParameterUseCase', () => {
  let useCase: ListParameterUseCase;
  let parameterRepository: IParameterRepository;

  beforeEach(() => {
    parameterRepository = {
      list: jest.fn(),
    } as any;

    useCase = new ListParameterUseCase(parameterRepository);
  });

  it('should call parameterRepository.list and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Parámetros listados',
      data: [
        { id: 1, name: 'pH', unit: 'mg/L', testMethod: 'Colorimetry', testCode: 'PH001' },
        { id: 2, name: 'Turbidity', unit: 'NTU', testMethod: 'Nephelometry', testCode: 'TB002' },
      ],
    };

    (parameterRepository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(parameterRepository.list).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});