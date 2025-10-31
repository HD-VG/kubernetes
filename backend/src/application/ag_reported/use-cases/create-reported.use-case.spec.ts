/* eslint-disable prettier/prettier */
import { CreateReportedUseCase } from './index.use-case';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';
import { CreateReportedDto } from 'src/presentation/dtos/ag_reported/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateReportedUseCase', () => {
    let useCase: CreateReportedUseCase;
    let repository: IReportedRepository;

    beforeEach(() => {
        repository = {
        create: jest.fn(),
        } as any;

        useCase = new CreateReportedUseCase(repository);
    });
    const user: FindById = { id:1 };
    it('should call repository.create with correct parameters', async () => {
        const dto: CreateReportedDto = {
        name: "Reported",
        lastname: "Lastname",
        ci: "12345678",
        phone: "123456789",
        email: "email",
        address: "Address",
        };
        const expectedResult = { status: true, message: 'Registro creado',
        data: [{
                id: 1,
                name: 'Reported',
                lastname: "Lastname",
                ci: "12345678",
                phone: "123456789",
                email: "email",
                address: "Address"
            }],
            all: 1,
    };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
    });
});