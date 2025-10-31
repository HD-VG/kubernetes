/* eslint-disable prettier/prettier */
import { FindByIdConfigurationVersionUseCase } from './index-configuration-version.use-case';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdConfigurationVersionUseCase', () => {
  let useCase: FindByIdConfigurationVersionUseCase;
  let repository: IConfigurationVersionRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdConfigurationVersionUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                d: 1,
                codeConfiguration: 'CFG-001',
                versionConfiguration: 'v1.0',
                messageConfiguration: 'Primera versión de configuración',
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});