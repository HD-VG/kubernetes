/* eslint-disable prettier/prettier */
import { SumAmountsByMonthRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';

describe('SumAmountsByMonthRegisterUseCase', () => {
    let useCase: SumAmountsByMonthRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
        sumAmountsByMonth: jest.fn(),
        } as any;

        useCase = new SumAmountsByMonthRegisterUseCase(repository);
    });

    it('should call repository.sumAmountsByMonth with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
        data: [{
            month: "Septiembre",
            year: 2025,
            total: 1000
        }
        ],
            all: 1,
    };

    (repository.sumAmountsByMonth as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.sumAmountsByMonth).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
    });
});