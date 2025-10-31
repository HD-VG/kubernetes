/* eslint-disable prettier/prettier */
import { CreateConfigurationCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { CreateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { FindById} from 'src/common/dto/index.dto';
describe('CreateConfigurationCarsUseCase', () => {
  let useCase: CreateConfigurationCarsUseCase;
  let repository: IConfigurationCarsRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationCarsUseCase(repository);
  });
  const user: FindById = { id: 1 };

  it('should call repository.create with correct parameters', async () => {
    const dto: CreateConfigurationCarDto = {
      register_id: 1,
      car: 1,
      time: '2023-10-10T10:00:00Z',
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                idVehiculo: "1",
                licensePlate: "XYZ789",
                make: "Toyota",
                model: "Corolla",
                basicCoste: 2020,
                estado: 1,
                time: "2023-10-10T10:00:00Z",
            }],
            all: 1,
    };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});