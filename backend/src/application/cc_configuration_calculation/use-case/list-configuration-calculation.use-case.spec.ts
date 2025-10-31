/* eslint-disable prettier/prettier */
import { ListConfigurationCalculationUseCase } from './list-configuration-calculation.use-case';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';

describe('ListConfigurationCalculationUseCase', () => {
  let useCase: ListConfigurationCalculationUseCase;
  let calculationRepository: IConfigurationCalculationRepository;

  beforeEach(() => {
    calculationRepository = {
      listConfigurations: jest.fn(),
    } as any;

    useCase = new ListConfigurationCalculationUseCase(calculationRepository);
  });

  it('should call calculationRepository.list with correct pagination', async () => {
    const expectedResult = {
      status: true,
      message: 'Registros encontrados',
      data: [{ id: 1, formula: 'Test User', instrumentUsed: 'abc', approvedByApps: true, statusConfiguration: true, rol: ['ADMIN'] }],
    };

    (calculationRepository.listConfigurations as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(calculationRepository.listConfigurations).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});