/* eslint-disable prettier/prettier */
import { FindByIdReporterUseCase } from './index.use.case';
import { IReporterRepository } from 'src/domain/ag_reporter/interface/reporter-repository.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('FindByIdReporterUseCase', () => {
    let useCase: FindByIdReporterUseCase;
    let repository: IReporterRepository;

    beforeEach(() => {
        repository = {
        findById: jest.fn(),
        } as any;

        useCase = new FindByIdReporterUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.findById with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registro encontrado',
        data: [{
                    id: 1,
                    name: "Reporter",
                    basicCoste: 123
                }],
                all: 1,
        };

        (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid);

        expect(repository.findById).toHaveBeenCalledWith(FindByUuid);
        expect(result).toEqual(expectedResult);
    });
});