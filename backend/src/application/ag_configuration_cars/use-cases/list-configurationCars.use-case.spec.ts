/* eslint-disable prettier/prettier */
import { ListConfigurationCarsUseCase } from './index.use-case';
import { IConfigurationCarsRepository } from 'src/domain/ag_configuration_cars/interface/configuration_car.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
describe('ListConfigurationCarsUseCase', () => {
    let useCase: ListConfigurationCarsUseCase;
    let repository: IConfigurationCarsRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListConfigurationCarsUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'ABC123',
                    rol: 'ADMIN',
                };
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

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});