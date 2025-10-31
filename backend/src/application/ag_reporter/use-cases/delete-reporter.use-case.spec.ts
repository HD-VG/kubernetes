/* eslint-disable prettier/prettier */
import { DeleteReporterUseCase } from './index.use.case';
import { IReporterRepository } from 'src/domain/ag_reporter/interface/reporter-repository.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteReporterUseCase', () => {
    let useCase: DeleteReporterUseCase;
    let repository: IReporterRepository;

    beforeEach(() => {
        repository = {
        delete: jest.fn(),
        } as any;

        useCase = new DeleteReporterUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
    it('should call repository.delete with correct parameters', async () => {
        const dto: FindById = {
        id: 1,
        };
        const userId = 1;
        const expectedResult = { status: true, message: 'Registro eliminado',
        data: [{
                    id: 1,
                    name: 'Reporter',
                    lastname: "Lastname",
                    ci: "12345678",
                    phone: "123456789",
                    email: "email",
                    address: "Address",
                    codeReporter: "codereportes"
                }],
                all: 1,
        };

        (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid, user);

        expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
        expect(result).toEqual(expectedResult);
    });
});