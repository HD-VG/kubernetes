/* eslint-disable prettier/prettier */
import { DeleteConfigurationVersionUseCase } from './index-configuration-version.use-case';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteConfigurationVersionUseCase', () => {
  let useCase: DeleteConfigurationVersionUseCase;
  let repository: IConfigurationVersionRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationVersionUseCase(repository);
  });


  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                codeConfiguration: 'CFG-001',
                versionConfiguration: 'v1.0',
                messageConfiguration: 'Primera versión de configuración',
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});