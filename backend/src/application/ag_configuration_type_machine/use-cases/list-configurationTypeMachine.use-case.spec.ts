/* eslint-disable prettier/prettier */
import { ListConfigurationTypeMachineUseCase } from './index.use-case';
import { IConfigurationTypeMachineRepository } from 'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListConfigurationTypeMachineUseCase', () => {
    let useCase: ListConfigurationTypeMachineUseCase;
    let repository: IConfigurationTypeMachineRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListConfigurationTypeMachineUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Machine',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "Machine",
                },
                {
                    id: 2,
                    name: "Machine",
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});