/* eslint-disable prettier/prettier */
import { ListReportedUseCase } from './index.use-case';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';

describe('ListReportedUseCase', () => {
    let useCase: ListReportedUseCase;
    let repository: IReportedRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListReportedUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "Reported",
                    basicCoste:123
                },
                {
                    id: 2,
                    name: "Reported",
                    basicCoste:123
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute();

        expect(repository.list).toHaveBeenCalledWith();
        expect(result).toEqual(expectedResult);
    });
});