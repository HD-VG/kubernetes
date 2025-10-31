/* eslint-disable prettier/prettier */
import { FindByIdReportedUseCase } from './index.use-case';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('FindByIdReportedUseCase', () => {
    let useCase: FindByIdReportedUseCase;
    let repository: IReportedRepository;

    beforeEach(() => {
        repository = {
        findById: jest.fn(),
        } as any;

        useCase = new FindByIdReportedUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.findById with correct parameters', async () => {

        const expectedResult = { status: true, message: 'Registro encontrado',
        data: [{
                    id: 1,
                    name: "Reported",
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