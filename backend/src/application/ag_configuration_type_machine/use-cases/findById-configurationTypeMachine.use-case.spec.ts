/* eslint-disable prettier/prettier */
import { FindByConfigurationTypeMachineUseCase } from './index.use-case';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

describe('FindByConfigurationTypeMachineUseCase', () => {
  let useCase: FindByConfigurationTypeMachineUseCase;
  let repository: IConfigurationTypeMachineRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByConfigurationTypeMachineUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: "ABC123",
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});