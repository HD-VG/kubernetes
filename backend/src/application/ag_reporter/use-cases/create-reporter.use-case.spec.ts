/* eslint-disable prettier/prettier */
import { CreateReporterUseCase } from './index.use.case';
import { IReporterRepository } from 'src/domain/ag_reporter/interface/reporter-repository.interface';
import { CreateReporterDto } from 'src/presentation/dtos/ag_reporter/index.dto';
import { FindById } from 'src/common/dto/index.dto';
describe('CreateReporterUseCase', () => {
    let useCase: CreateReporterUseCase;
    let repository: IReporterRepository;

    beforeEach(() => {
        repository = {
        create: jest.fn(),
        } as any;

        useCase = new CreateReporterUseCase(repository);
    });
    const user: FindById = { id:1 };
    it('should call repository.create with correct parameters', async () => {
        const dto: CreateReporterDto = {
        name: "Reporter",
        lastname: "Lastname",
        ci: "12345678",
        phone: "123456789",
        email: "email",
        address: "Address",
        codeReporter: "codereportes"

        };
        const expectedResult = { status: true, message: 'Registro creado',
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

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});