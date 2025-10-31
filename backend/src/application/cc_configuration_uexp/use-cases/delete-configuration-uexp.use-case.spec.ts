/* eslint-disable prettier/prettier */
import { DeleteConfigurationUexpUseCase } from './index.use-case';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteConfigurationUexpUseCase', () => {
  let useCase: DeleteConfigurationUexpUseCase;
  let repository: IConfigurationUexpRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationUexpUseCase(repository);
  });


  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
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

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});