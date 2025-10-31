/* eslint-disable prettier/prettier */
import { UpdateConfigurationCalculationUseCase } from './update-configuration-calculation.use.case';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { UpdateConfigurationCalculationDto } from 'src/presentation/dtos/cc_configuration_calculations/index.dto';

describe('UpdateConfigurationCalculationUseCase', () => {
  let useCase: UpdateConfigurationCalculationUseCase;
  let repository: IConfigurationCalculationRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationCalculationUseCase(repository);
  });

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationCalculationDto = {
                id: '1',
                formula: 'test',
                instrumentUsed: 'test',
                approvedByApps: true,
                statusConfiguration: true,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});