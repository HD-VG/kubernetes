/* eslint-disable prettier/prettier */
import { DeleteReportedUseCase } from './index.use-case';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteReportedUseCase', () => {
    let useCase: DeleteReportedUseCase;
    let repository: IReportedRepository;

    beforeEach(() => {
        repository = {
        delete: jest.fn(),
        } as any;

        useCase = new DeleteReportedUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
    it('should call repository.delete with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registro eliminado',
        data: [{
                    id: 1,
                    name: 'Reported',
                    lastname: "Lastname",
                    ci: "12345678",
                    phone: "123456789",
                    email: "email",
                    address: "Address",
                    codeReported: "codereportes"
                }],
                all: 1,
        };

        (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid, user);

        expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
        expect(result).toEqual(expectedResult);
    });
});