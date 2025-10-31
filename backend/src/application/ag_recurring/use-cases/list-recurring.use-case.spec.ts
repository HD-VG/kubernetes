/* eslint-disable prettier/prettier */
import { ListRecurringUseCase } from './index.use-case';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListRecurringUseCase', () => {
    let useCase: ListRecurringUseCase;
    let repository: IRecurringRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListRecurringUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'recurring',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "recurring",
                    basicCoste: 123
                },
                {
                    id: 2,
                    name: "recurring",
                    basicCoste: 123
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});