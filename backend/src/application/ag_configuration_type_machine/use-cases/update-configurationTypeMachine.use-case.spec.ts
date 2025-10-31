/* eslint-disable prettier/prettier */
import { UpdateConfigurationTypeMachineUseCase } from './index.use-case';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { UpdateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
describe('UpdateConfigurationTypeMachineUseCase', () => {
  let useCase: UpdateConfigurationTypeMachineUseCase;
  let repository: IConfigurationTypeMachineRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationTypeMachineUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationTypeMachineDto = {
      name: 'MachineActualizado',
      basicCoste: 2020
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
        id: 1,
        name: "MachineActualizado",
        basicCoste: 2020
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});