/* eslint-disable prettier/prettier */
import { UpdateConfigurationTypeDagmeUseCase } from './index.use-case';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { UpdateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';
describe('UpdateConfigurationTypeDagmeUseCase', () => {
  let useCase: UpdateConfigurationTypeDagmeUseCase;
  let repository: IConfigurationTypeDagmeRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationTypeDagmeUseCase(repository);
  });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationTypeDagmeDto = {
      name: 'DagmeActualizado',
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
        id: 1,
        name: "DagmeActualizado"
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});