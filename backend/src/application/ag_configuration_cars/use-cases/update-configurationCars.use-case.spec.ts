/* eslint-disable prettier/prettier */
import { UpdateConfigurationCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { UpdateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';
describe('UpdateConfigurationCarsUseCase', () => {
  let useCase: UpdateConfigurationCarsUseCase;
  let repository: IConfigurationCarsRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationCarsUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationCarDto = {
      register_id: 1,
      car: 1,
      time: 'CarActualizado',
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data: [{
                id: 1,
                idVehiculo: "1",
                licensePlate: "XYZ789",
                make: "Toyota",
                model: "Corolla",
                basicCoste: 2020,
                estado: 1,
                time: "CarActualizado",
            }],
            all: 1,
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});