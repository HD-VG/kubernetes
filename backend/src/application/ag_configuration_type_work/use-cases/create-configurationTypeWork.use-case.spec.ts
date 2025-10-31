/* eslint-disable prettier/prettier */
import { CreateConfigurationTypeWorkUseCase } from './index.use-case';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { CreateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateConfigurationTypeWorkUseCase', () => {
  let useCase: CreateConfigurationTypeWorkUseCase;
  let repository: IConfigurationTypeWorkRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationTypeWorkUseCase(repository);
  });
  const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateConfigurationTypeWorkDto = {
      name: "Work"
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                name: 'Work',
            }],
            all: 1,
      };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});