/* eslint-disable prettier/prettier */
import { FindByIdtConfigurationUexpUseCase } from './index.use-case';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdtConfigurationUexpUseCase', () => {
  let useCase: FindByIdtConfigurationUexpUseCase;
  let repository: IConfigurationUexpRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdtConfigurationUexpUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                minValue: 1,
                maxValue: 5,
                ld: 3.5,
                formula: 'x-0.1542',
                ctwId: 1,
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});