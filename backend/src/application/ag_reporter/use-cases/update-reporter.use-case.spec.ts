/* eslint-disable prettier/prettier */
import { UpdateReporterUseCase } from './index.use.case';
import { IReporterRepository } from 'src/domain/ag_reporter/interface/reporter-repository.interface';
import { UpdateReporterDto } from 'src/presentation/dtos/ag_reporter/index.dto';
import { FindByUuid, FindById } from 'src/common/dto/index.dto';
describe('UpdateReporterUseCase', () => {
    let useCase: UpdateReporterUseCase;
    let repository: IReporterRepository;

    beforeEach(() => {
        repository = {
        update: jest.fn(),
        } as any;

        useCase = new UpdateReporterUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
    it('should call repository.update with correct parameters', async () => {
        const dto: UpdateReporterDto = {
        name: 'ReporterActualizado',
        lastname: "Lastname",
        ci: "12345678",
        phone: "123456789",
        email: "email",
        address: "Address",
        codeReporter: "codereportes"
        };
        const expectedResult = { status: true, message: 'Registro Actualizado',
        data:[{
            id: 1,
            name: "ReporterActualizado",
            basicCoste: 123,
            lastname: "Lastname",
            ci: "12345678",
            phone: "123456789",
            email: "email",
            address: "Address",
            codeReporter: "codereportes"
        }]
        };

        (repository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid, dto, user);

        expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
        expect(result).toEqual(expectedResult);
    });
});