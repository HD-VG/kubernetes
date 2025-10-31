/* eslint-disable prettier/prettier */
import { ListWaterUseCase } from './index.use-case';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListWaterUseCase', () => {
    let useCase: ListWaterUseCase;
    let repository: IWaterRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListWaterUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Water',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "Water",
                    basicCoste: 123
                },
                {
                    id: 2,
                    name: "Water",
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