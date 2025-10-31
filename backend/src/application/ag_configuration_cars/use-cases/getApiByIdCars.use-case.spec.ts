/* eslint-disable prettier/prettier */
import { GetApiByIdCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { Vehicles } from 'src/presentation/dtos/ag_configuration_cars/getApiCars.dto';
describe('GetApiByIdCarsUseCase', () => {
    let useCase: GetApiByIdCarsUseCase;
    let repository: IConfigurationCarsRepository;

    beforeEach(() => {
        repository = {
        findByIdDataApi: jest.fn(),
        } as any;

        useCase = new GetApiByIdCarsUseCase(repository);
    });

    it('should call repository.findByIdDataApi with correct parameters', async () => {
        const dto: FindById = {
                    id:1,
                };
        const data1: Vehicles = {
            idVehiculo: 1,
            placa: "XYZ789",
            marca: "Toyota", 
            modelo: "Corolla",
            costo_base: 2020,
            estado: 1,
        }
        const expectedResult = { status: true, message: 'Registro encontrado de la URL',
        data: [{
                    data1
                }
                ],
                all: 1,
        };

        (repository.findByIdDataApi as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(dto.id);

        expect(repository.findByIdDataApi).toHaveBeenCalledWith(dto.id);
        expect(result).toEqual(expectedResult);
    });
});