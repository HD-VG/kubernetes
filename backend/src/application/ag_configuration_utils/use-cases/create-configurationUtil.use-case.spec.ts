/* eslint-disable prettier/prettier */
import { CreateConfigurationUtilUseCase } from './index.use-case';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { CreateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateConfigurationUtilUseCase', () => {
  let useCase: CreateConfigurationUtilUseCase;
  let repository: IConfigurationUtilRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationUtilUseCase(repository);
  });
    const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateConfigurationUtilDto = {
      name: "utils",
      basicCosteHour: 12.5,
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                name: 'utils',
                basicCosteHour: 12.5,
            }],
            all: 1,
      };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});