/* eslint-disable prettier/prettier */
import { UpdateConfigurationTypeWorkUseCase } from './index.use-case';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { UpdateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
describe('UpdateConfigurationTypeWorkUseCase', () => {
  let useCase: UpdateConfigurationTypeWorkUseCase;
  let repository: IConfigurationTypeWorkRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationTypeWorkUseCase(repository);
  });

    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationTypeWorkDto = {
      name: 'WorkActualizado',
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
        id: 1,
        name: "WorkActualizado"
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});