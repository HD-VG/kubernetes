/* eslint-disable prettier/prettier */
import { CreateConfigurationUexpUseCase } from 'src/application/cc_configuration_uexp/use-cases/create-configuration-uexp.use-case';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';
import { CreateConfigurationUexpDto } from 'src/presentation/dtos/cc_configuration_uexp/create-configuration_uexp.dto';

describe('CreateConfigurationUexpUseCase', () => {
  let useCase: CreateConfigurationUexpUseCase;
  let repository: IConfigurationUexpRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationUexpUseCase(repository);
  });

  it('should call repository.create with dto and userId, and return result', async () => {
    const dto: CreateConfigurationUexpDto = {
      minValue: 1,
      maxValue: 5,
      ld: 3.5,
      formula: 'x-0.1542',
      ctwId: 1,
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Configuración UEXP creada' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});