/* eslint-disable prettier/prettier */
import { CreateConfigurationVersionUseCase } from 'src/application/cc_configuration_version/use-cases/create-configuration_version.use-case';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { CreateAdminConfigurationDto } from 'src/presentation/dtos/cc_configuration_version/index.dto';

describe('CreateConfigurationVersionUseCase', () => {
  let useCase: CreateConfigurationVersionUseCase;
  let repository: IConfigurationVersionRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationVersionUseCase(repository);
  });

  it('should call repository.create with dto and userId, and return result', async () => {
    const dto: CreateAdminConfigurationDto = {
      codeConfiguration: 'CFG-001',
      versionConfiguration: 'v1.0',
      messageConfiguration: 'Primera versión de configuración',
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Configuración creada' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});