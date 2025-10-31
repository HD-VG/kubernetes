/* eslint-disable prettier/prettier */
import { ListConfigurationTypeDagmeUseCase } from './index.use-case';
import { IConfigurationTypeDagmeRepository } from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListConfigurationTypeDagmeUseCase', () => {
    let useCase: ListConfigurationTypeDagmeUseCase;
    let repository: IConfigurationTypeDagmeRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListConfigurationTypeDagmeUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'dagme',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "dagme",
                },
                {
                    id: 2,
                    name: "dagme",
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});