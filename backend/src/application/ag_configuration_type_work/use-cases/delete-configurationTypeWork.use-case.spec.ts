/* eslint-disable prettier/prettier */
import { DeleteConfigurationTypeWorkUseCase } from './index.use-case';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteConfigurationTypeWorkUseCase', () => {
  let useCase: DeleteConfigurationTypeWorkUseCase;
  let repository: IConfigurationTypeWorkRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationTypeWorkUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.delete with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                name: 'Work',
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, user);

    expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
    expect(result).toEqual(expectedResult);
  });
});