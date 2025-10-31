/* eslint-disable prettier/prettier */
import { FindByConfigurationTypeWorkUseCase } from './index.use-case';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('FindByConfigurationTypeWorkUseCase', () => {
  let useCase: FindByConfigurationTypeWorkUseCase;
  let repository: IConfigurationTypeWorkRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByConfigurationTypeWorkUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: "Work",
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});