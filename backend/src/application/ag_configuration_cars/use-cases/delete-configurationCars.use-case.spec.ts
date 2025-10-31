/* eslint-disable prettier/prettier */
import { DeleteConfigurationCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteConfigurationCarsUseCase', () => {
  let useCase: DeleteConfigurationCarsUseCase;
  let repository: IConfigurationCarsRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteConfigurationCarsUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.delete with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro eliminado',
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

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, user);

    expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
    expect(result).toEqual(expectedResult);
  });
});