/* eslint-disable prettier/prettier */
import { ListConfigurationTypeWaterUseCase } from 'src/application/cc_configuration_type_water/use-cases/list-configuration-type-water.use-case';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';

describe('ListConfigurationTypeWaterUseCase', () => {
  let useCase: ListConfigurationTypeWaterUseCase;
  let repository: IConfigurationTypeWaterRepository;

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    } as any;

    useCase = new ListConfigurationTypeWaterUseCase(repository);
  });

  it('should call repository.list and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Tipos de agua listados',
      data: [
        { id: 1, name: 'Agua Potable', definition: 'Agua apta para consumo humano', abbreviation: 'AP' },
        { id: 2, name: 'Agua Residual', definition: 'Agua contaminada proveniente de procesos', abbreviation: 'AR' },
      ],
    };

    (repository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.list).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});