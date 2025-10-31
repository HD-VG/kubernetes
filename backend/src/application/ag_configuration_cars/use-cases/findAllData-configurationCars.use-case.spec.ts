/* eslint-disable prettier/prettier */
import { FindAllDataConfigurationCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';

describe('FindAllDataConfigurationCarsUseCase', () => {
  let useCase: FindAllDataConfigurationCarsUseCase;
  let repository: IConfigurationCarsRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataConfigurationCarsUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
      data: [{
                id: 1,
                idVehiculo: "ABC123",
                licensePlate: "XYZ789",
                make: "Toyota",
                model: "Corolla",
                basicCoste: 2020,
                estado: 1,
                time: "2023-10-10T10:00:00Z",
            },
          {
                id: 2,
                idVehiculo: "ABC123",
                licensePlate: "XYZ789",
                make: "Toyota",
                model: "Corolla",
                basicCoste: 2020,
                estado: 1,
                time: "2023-10-10T10:00:00Z",
            }],
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});