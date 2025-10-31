/* eslint-disable prettier/prettier */
import { FindByIdConfigurationCalculationUseCase } from './index-configuration-calculation.use-case';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdConfigurationCalculationUseCase', () => {
  let useCase: FindByIdConfigurationCalculationUseCase;
  let repository: IConfigurationCalculationRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdConfigurationCalculationUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                formula: 'test',
                instrumentUsed: 'test',
                approvedByApps: true,
                statusConfiguration: true,
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});