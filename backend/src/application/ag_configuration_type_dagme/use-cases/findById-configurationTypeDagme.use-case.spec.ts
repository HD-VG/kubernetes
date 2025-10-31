/* eslint-disable prettier/prettier */
import { FindByConfigurationTypeDagmeUseCase } from './index.use-case';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

describe('FindByConfigurationTypeDagmeUseCase', () => {
  let useCase: FindByConfigurationTypeDagmeUseCase;
  let repository: IConfigurationTypeDagmeRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByConfigurationTypeDagmeUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: "dagme",
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});