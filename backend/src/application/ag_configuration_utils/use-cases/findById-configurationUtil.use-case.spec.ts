/* eslint-disable prettier/prettier */
import { FindByConfigurationUtilUseCase } from './index.use-case';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

describe('FindByConfigurationUtilUseCase', () => {
  let useCase: FindByConfigurationUtilUseCase;
  let repository: IConfigurationUtilRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByConfigurationUtilUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: "Utils",
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});