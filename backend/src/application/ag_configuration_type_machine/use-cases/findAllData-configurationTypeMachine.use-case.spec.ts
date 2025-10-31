/* eslint-disable prettier/prettier */
import { FindAllDataConfigurationTypeMachineUseCase } from './index.use-case';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';

describe('FindAllDataConfigurationTypeMachineUseCase', () => {
  let useCase: FindAllDataConfigurationTypeMachineUseCase;
  let repository: IConfigurationTypeMachineRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataConfigurationTypeMachineUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
      data: [{
                id: 1,
                name: "Machine",
                basicCoste: 2020
            },
            {
                id: 2,
                name: "Machine",
                basicCoste: 2020
            }],
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});