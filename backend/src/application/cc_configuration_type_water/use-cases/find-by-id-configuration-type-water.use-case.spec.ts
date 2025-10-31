/* eslint-disable prettier/prettier */
import { FindByIdtConfigurationTypeWaterUseCase } from './index.use-case';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdtConfigurationTypeWaterUseCase', () => {
  let useCase: FindByIdtConfigurationTypeWaterUseCase;
  let repository: IConfigurationTypeWaterRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdtConfigurationTypeWaterUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: 'Agua Potable',
                definition: 'Agua apta para consumo humano',
                abbreviation: 'AP',
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});