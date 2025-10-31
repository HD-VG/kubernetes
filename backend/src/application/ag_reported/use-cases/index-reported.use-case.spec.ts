/* eslint-disable prettier/prettier */
import { IndexReportedUseCase } from './index.use-case';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('IndexReportedUseCase', () => {
    let useCase: IndexReportedUseCase;
    let repository: IReportedRepository;

    beforeEach(() => {
        repository = {
        list_pagintation: jest.fn(),
        } as any;

        useCase = new IndexReportedUseCase(repository);
    });

    it('should call repository.list_pagintation with correct parameters', async () => {
        const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Reported',
                    rol: 'ADMIN',
                };
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "Reported",
                    basicCoste: 123
                },
                {
                    id: 2,
                    name: "Reported",
                    basicCoste: 123
                }],
                all: 2,
        };

        (repository.list_pagintation as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(pgdto);

        expect(repository.list_pagintation).toHaveBeenCalledWith(pgdto);
        expect(result).toEqual(expectedResult);
    });
});