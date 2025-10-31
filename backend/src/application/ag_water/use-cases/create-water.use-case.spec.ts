/* eslint-disable prettier/prettier */
import { CreateWaterUseCase } from './index.use-case';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { CreateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateWaterUseCase', () => {
  let useCase: CreateWaterUseCase;
  let repository: IWaterRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateWaterUseCase(repository);
  });
    const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateWaterDto = {
      name: "Water",
      basicCoste: 123,
      height: 10,
      cohefficientDischarge:10
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                name: 'Water',
                basicCoste: 123,
                height: 10,
                cohefficientDischarge:10
            }],
            all: 1,
      };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});