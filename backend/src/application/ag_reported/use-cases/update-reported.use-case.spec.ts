/* eslint-disable prettier/prettier */
import { UpdateReportedUseCase } from './index.use-case';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';
import { UpdateReportedDto } from 'src/presentation/dtos/ag_reported/index.dto';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';
describe('UpdateReportedUseCase', () => {
    let useCase: UpdateReportedUseCase;
    let repository: IReportedRepository;

    beforeEach(() => {
        repository = {
        update: jest.fn(),
        } as any;

        useCase = new UpdateReportedUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
    it('should call repository.update with correct parameters', async () => {
        const dto: UpdateReportedDto = {
        name: 'ReportedActualizado',
        lastname: "Lastname",
        ci: "12345678",
        phone: "123456789",
        email: "email",
        address: "Address",
        };
        const expectedResult = { status: true, message: 'Registro Actualizado',
        data:[{
            id: 1,
            name: "ReportedActualizado",
            basicCoste: 123,
            lastname: "Lastname",
            ci: "12345678",
            phone: "123456789",
            email: "email",
            address: "Address",
        }]
        };

        (repository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid, dto, user);

        expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
        expect(result).toEqual(expectedResult);
    });
});