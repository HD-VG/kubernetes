/* eslint-disable prettier/prettier */
import { DeleteWaterUseCase } from './index.use-case';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteWaterUseCase', () => {
  let useCase: DeleteWaterUseCase;
  let repository: IWaterRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteWaterUseCase(repository);
  });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
  it('should call repository.delete with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                name: 'Water',
                basicCoste: 123
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, user);

    expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
    expect(result).toEqual(expectedResult);
  });
});