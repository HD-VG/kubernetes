/* eslint-disable prettier/prettier */
import { ListConfigurationTypeWorkUseCase } from './index.use-case';
import { IConfigurationTypeWorkRepository } from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListConfigurationTypeWorkUseCase', () => {
    let useCase: ListConfigurationTypeWorkUseCase;
    let repository: IConfigurationTypeWorkRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListConfigurationTypeWorkUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Work',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "Work",
                },
                {
                    id: 2,
                    name: "Work",
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});