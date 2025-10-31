/* eslint-disable prettier/prettier */
import { ListConfigurationVersionUseCase } from 'src/application/cc_configuration_version/use-cases/list-configuration-version.use-case';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';

describe('ListConfigurationVersionUseCase', () => {
  let useCase: ListConfigurationVersionUseCase;
  let repository: IConfigurationVersionRepository;

  beforeEach(() => {
    repository = {
      listConfigurations: jest.fn(),
    } as any;

    useCase = new ListConfigurationVersionUseCase(repository);
  });

  it('should call repository.listConfigurations and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Configuraciones listadas',
      data: [
        { id: 1, codeConfiguration: 'CFG-001', versionConfiguration: 'v1.0', messageConfiguration: 'Primera versión' },
        { id: 2, codeConfiguration: 'CFG-002', versionConfiguration: 'v1.1', messageConfiguration: 'Actualización menor' },
      ],
    };

    (repository.listConfigurations as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.listConfigurations).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});