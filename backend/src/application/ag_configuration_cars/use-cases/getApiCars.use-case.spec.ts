/* eslint-disable prettier/prettier */
import { GetApiCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { Vehicles } from 'src/presentation/dtos/ag_configuration_cars/getApiCars.dto';
describe('GetfindAllDataApiConfigurationCarsUseCase', () => {
    let useCase: GetApiCarsUseCase;
    let repository: IConfigurationCarsRepository;

    beforeEach(() => {
        repository = {
        findAllDataApi: jest.fn(),
        } as any;

        useCase = new GetApiCarsUseCase(repository);
    });

    it('should call repository.findAllDataApi with correct parameters', async () => {
        const data1: Vehicles = {
            idVehiculo: 1,
            placa: "XYZ789",
            marca: "Toyota", 
            modelo: "Corolla",
            costo_base: 2020,
            estado: 1,
        }
        const data2: Vehicles = {
            idVehiculo: 2,
            placa: "XYZ789",
            marca: "Toyota", 
            modelo: "Corolla",
            costo_base: 2020,
            estado: 1,
        }
        const expectedResult = { status: true, message: 'Registros encontrados de la URL',
        data: [{
                    data1
                },
                {
                    data2
                }],
                all: 2,
        };

        (repository.findAllDataApi as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute();

        expect(repository.findAllDataApi).toHaveBeenCalledWith();
        expect(result).toEqual(expectedResult);
    });
});