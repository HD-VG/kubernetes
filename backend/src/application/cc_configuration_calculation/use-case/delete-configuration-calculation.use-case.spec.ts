/* eslint-disable prettier/prettier */
import { DeleteConfigurationCalculationUseCase } from './index-configuration-calculation.use-case';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteConfigurationCalculationUseCase', () => {
  let useCase: DeleteConfigurationCalculationUseCase;
  let repository: IConfigurationCalculationRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationCalculationUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                formula: 'test',
                instrumentUsed: 'test',
                approvedByApps: true,
                statusConfiguration: true,
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});