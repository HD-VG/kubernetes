/* eslint-disable prettier/prettier */
import { UpdateConfigurationVersionUseCase } from './index-configuration-version.use-case';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { UpdateAdminConfigurationDto } from 'src/presentation/dtos/cc_configuration_version/index.dto';

describe('UpdateConfigurationVersionUseCase', () => {
  let useCase: UpdateConfigurationVersionUseCase;
  let repository: IConfigurationVersionRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationVersionUseCase(repository);
  });

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateAdminConfigurationDto = {
                id:1,
                codeConfiguration: 'CFG-001',
                versionConfiguration: 'v1.0',
                messageConfiguration: 'Primera versión de configuración',
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});