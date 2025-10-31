/* eslint-disable prettier/prettier */
import { ListReporterUseCase } from './index.use.case';
import { IReporterRepository } from 'src/domain/ag_reporter/interface/reporter-repository.interface';

describe('ListReporterUseCase', () => {
    let useCase: ListReporterUseCase;
    let repository: IReporterRepository;

    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListReporterUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                    id: 1,
                    name: "Reporter",
                    basicCoste:123
                },
                {
                    id: 2,
                    name: "Reporter",
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