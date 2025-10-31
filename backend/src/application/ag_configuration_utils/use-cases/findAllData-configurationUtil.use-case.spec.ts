/* eslint-disable prettier/prettier */
import { FindAllDataConfigurationUtilUseCase } from './index.use-case';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';

describe('FindAllDataConfigurationUtilUseCase', () => {
  let useCase: FindAllDataConfigurationUtilUseCase;
  let repository: IConfigurationUtilRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataConfigurationUtilUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
      data: [{
                id: 1,
                name: "Utils",
                basicCosteHour: 12.5,
            },
            {
                id: 2,
                name: "Utils",
                basicCosteHour: 12.5,
            }],
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});