/* eslint-disable prettier/prettier */
import { CreateParameterUseCase } from 'src/application/cc_configuration_parameter/use-cases/create-parameter.use-case';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { CreateParameterDto } from 'src/presentation/dtos/cc_configuration_parameter/create-parameter.dto';

describe('CreateParameterUseCase', () => {
  let useCase: CreateParameterUseCase;
  let parameterRepository: IParameterRepository;

  beforeEach(() => {
    parameterRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateParameterUseCase(parameterRepository);
  });

  it('should call parameterRepository.create with dto and userId, and return result', async () => {
    const dto: CreateParameterDto = {
      name: 'pH',
      unit: 'mg/L',
      testMethod: 'Colorimetry',
      testCode: 'PH001',
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Parámetro creado' };

    (parameterRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(parameterRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});