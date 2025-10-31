/* eslint-disable prettier/prettier */
import { CreateConfigurationTypeDagmeUseCase } from './index.use-case';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { CreateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateConfigurationTypeDagmeUseCase', () => {
  let useCase: CreateConfigurationTypeDagmeUseCase;
  let repository: IConfigurationTypeDagmeRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationTypeDagmeUseCase(repository);
  });

  const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateConfigurationTypeDagmeDto = {
      name: "dagme"
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                name: 'dagme',
            }],
            all: 1,
      };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});