/* eslint-disable prettier/prettier */
import { DeleteConfigurationTypeWaterUseCase } from './index.use-case';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteConfigurationTypeWaterUseCase', () => {
  let useCase: DeleteConfigurationTypeWaterUseCase;
  let repository: IConfigurationTypeWaterRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationTypeWaterUseCase(repository);
  });

  it('should call repository.delete with correct Waters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                name: 'Agua Potable',
                definition: 'Agua apta para consumo humano',
                abbreviation: 'AP',
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});