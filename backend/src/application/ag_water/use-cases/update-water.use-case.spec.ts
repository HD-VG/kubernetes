/* eslint-disable prettier/prettier */
import { UpdateWaterUseCase } from './index.use-case';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { UpdateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
describe('UpdateWaterUseCase', () => {
  let useCase: UpdateWaterUseCase;
  let repository: IWaterRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateWaterUseCase(repository);
  });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateWaterDto = {
      name: 'WaterActualizado',
      basicCoste: 123,
      height: 10,
      cohefficientDischarge:10
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
        id: 1,
        name: "WaterActualizado",
        basicCoste: 123,
        height: 10,
        cohefficientDischarge:10
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});