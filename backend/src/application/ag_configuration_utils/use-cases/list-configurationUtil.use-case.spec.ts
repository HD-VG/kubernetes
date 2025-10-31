/* eslint-disable prettier/prettier */
import { ListConfigurationUtilUseCase } from './index.use-case';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListConfigurationUtilUseCase', () => {
    let useCase: ListConfigurationUtilUseCase;
    let repository: IConfigurationUtilRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListConfigurationUtilUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'utils',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "utils",
                },
                {
                    id: 2,
                    name: "utils",
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});