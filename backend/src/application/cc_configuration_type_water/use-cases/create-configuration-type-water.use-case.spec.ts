/* eslint-disable prettier/prettier */
import { CreateConfigurationTypeWaterUseCase } from 'src/application/cc_configuration_type_water/use-cases/create-configuration-type-water.use-case';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';
import { CreateTypeWaterDto } from 'src/presentation/dtos/cc_configuration_type_water/create-type_water.dto';

describe('CreateConfigurationTypeWaterUseCase', () => {
  let useCase: CreateConfigurationTypeWaterUseCase;
  let repository: IConfigurationTypeWaterRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationTypeWaterUseCase(repository);
  });

  it('should call repository.create with dto and userId, and return result', async () => {
    const dto: CreateTypeWaterDto = {
      name: 'Agua Potable',
      definition: 'Agua apta para consumo humano',
      abbreviation: 'AP',
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Tipo de agua creado' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});