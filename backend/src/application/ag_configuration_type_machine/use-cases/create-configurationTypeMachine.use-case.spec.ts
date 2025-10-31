/* eslint-disable prettier/prettier */
import { CreateConfigurationTypeMachineUseCase } from './index.use-case';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { CreateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateConfigurationTypeMachineUseCase', () => {
  let useCase: CreateConfigurationTypeMachineUseCase;
  let repository: IConfigurationTypeMachineRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationTypeMachineUseCase(repository);
  });
  const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateConfigurationTypeMachineDto = {
      name: "dagme",
      basicCoste: 2020
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                name: 'dagme',
                basicCoste: 2020 
            }],
            all: 1,
      };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});