/* eslint-disable prettier/prettier */
import { FindByWaterUseCase } from './index.use-case';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('FindByWaterUseCase', () => {
  let useCase: FindByWaterUseCase;
  let repository: IWaterRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByWaterUseCase(repository);
  });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {
    
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                name: "Water",
                basicCoste: 123,
                height: 10,
                cohefficientDischarge:10
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});