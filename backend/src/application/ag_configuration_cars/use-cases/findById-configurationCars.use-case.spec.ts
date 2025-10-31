/* eslint-disable prettier/prettier */
import { FindByConfigurationCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

describe('FindByConfigurationCarsUseCase', () => {
  let useCase: FindByConfigurationCarsUseCase;
  let repository: IConfigurationCarsRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByConfigurationCarsUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {

    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                idVehiculo: "ABC123",
                licensePlate: "XYZ789",
                make: "Toyota",
                model: "Corolla",
                basicCoste: 2020,
                estado: 1,
                time: "2023-10-10T10:00:00Z",
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});