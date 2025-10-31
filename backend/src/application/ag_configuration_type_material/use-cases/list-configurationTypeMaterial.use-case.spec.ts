/* eslint-disable prettier/prettier */
import { ListConfigurationTypeMaterialUseCase } from './index.use-case';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListConfigurationTypeMaterialUseCase', () => {
    let useCase: ListConfigurationTypeMaterialUseCase;
    let repository: IConfigurationTypeMaterialRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListConfigurationTypeMaterialUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Material',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                id: 1,
                code: 1,
                parent: "string",
                level: 10,
                branches: 10,
                name: "string",
                unit: "string",
                valMinimun: 10,
                valMaximun: 1,
                priceUs: 10,
                priceBs: 10,
                typeItem: "string",
                iStock: "string",
                quantityD: 10,
                quantityH: 10,
                balandeAmount: 10,
                quantity: 10,
                debitBs: 10,
                creditBs: 10,
                balanceCost: 10,
                unitRequested: "string",
                totalCost: 10
            },
            {
                id: 2,
                code: 1,
                parent: "string",
                level: 10,
                branches: 10,
                name: "string",
                unit: "string",
                valMinimun: 10,
                valMaximun: 1,
                priceUs: 10,
                priceBs: 10,
                typeItem: "string",
                iStock: "string",
                quantityD: 10,
                quantityH: 10,
                balandeAmount: 10,
                quantity: 10,
                debitBs: 10,
                creditBs: 10,
                balanceCost: 10,
                unitRequested: "string",
                totalCost: 10
            }],
            all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});