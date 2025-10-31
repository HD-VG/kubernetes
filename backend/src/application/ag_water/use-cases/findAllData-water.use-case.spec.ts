/* eslint-disable prettier/prettier */
import { FindAllDataWaterUseCase } from './index.use-case';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';

describe('FindAllDataWaterUseCase', () => {
  let useCase: FindAllDataWaterUseCase;
  let repository: IWaterRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataWaterUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
      data: [{
                id: 1,
                name: "Water",
                basicCoste:123,
                height: 10,
                cohefficientDischarge:10
            },
            {
                id: 2,
                name: "Water",
                basicCoste:123,
                height: 10,
                cohefficientDischarge:10
            }],
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});