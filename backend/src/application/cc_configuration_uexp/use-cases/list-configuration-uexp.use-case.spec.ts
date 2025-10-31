/* eslint-disable prettier/prettier */
import { ListConfigurationUexpUseCase } from 'src/application/cc_configuration_uexp/use-cases/list-configuration-uexp.use-case';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';

describe('ListConfigurationUexpUseCase', () => {
  let useCase: ListConfigurationUexpUseCase;
  let repository: IConfigurationUexpRepository;

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    } as any;

    useCase = new ListConfigurationUexpUseCase(repository);
  });

  it('should call repository.list and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Configuraciones UEXP listadas',
      data: [
        { id: 1, minValue: 1, maxValue: 5, ld: 3.5, formula: 'x-0.1542', ctwId: 1 },
        { id: 2, minValue: 2, maxValue: 6, ld: 4.0, formula: 'x+0.5', ctwId: 2 },
      ],
    };

    (repository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.list).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});