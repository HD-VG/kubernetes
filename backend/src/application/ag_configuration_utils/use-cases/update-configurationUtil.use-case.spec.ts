/* eslint-disable prettier/prettier */
import { UpdateConfigurationUtilUseCase } from './index.use-case';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
describe('UpdateConfigurationUtilUseCase', () => {
  let useCase: UpdateConfigurationUtilUseCase;
  let repository: IConfigurationUtilRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationUtilUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationUtilDto = {
      name: 'UtilActualizado',
      basicCosteHour: 15.0,
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
        id: 1,
        name: "UtilActualizado",
        basicCosteHour: 15.0
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});