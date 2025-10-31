/* eslint-disable prettier/prettier */
import { FindAllDataConfigurationTypeWorkUseCase } from './index.use-case';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';

describe('FindAllDataConfigurationTypeWorkUseCase', () => {
  let useCase: FindAllDataConfigurationTypeWorkUseCase;
  let repository: IConfigurationTypeWorkRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataConfigurationTypeWorkUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
      data: [{
                id: 1,
                name: "Work",
            },
            {
                id: 2,
                name: "Work",
            }],
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});