/* eslint-disable prettier/prettier */
import { DeleteConfigurationTypeMachineUseCase } from './index.use-case';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteConfigurationTypeMachineUseCase', () => {
  let useCase: DeleteConfigurationTypeMachineUseCase;
  let repository: IConfigurationTypeMachineRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationTypeMachineUseCase(repository);
  });

    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
  it('should call repository.delete with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                name: 'Machine',
                basicCoste: 2020
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, user);

    expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
    expect(result).toEqual(expectedResult);
  });
});