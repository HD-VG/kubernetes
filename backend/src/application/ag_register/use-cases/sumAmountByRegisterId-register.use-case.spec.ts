/* eslint-disable prettier/prettier */
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { SumAmountByRegisterIdRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';

describe('SumAmountByRegisterIdRegisterUseCase', () => {
    let useCase: SumAmountByRegisterIdRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
        sumAmountByRegisterId: jest.fn(),
        } as any;

        useCase = new SumAmountByRegisterIdRegisterUseCase(repository);
    });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.sumAmountByRegisterId with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
        data: [{
            registerId: 1,
            reporterName: "MATIAS",
            reporterLastname: "DAZA BARRON",
            reportedName: "MATIAS",
            reportedLastname: "DAZA BARRON",
            date: "2025-08-27T04:00:00.000Z",
            time: "08:30:00",
            code: "ABC123",
            cite: 456,
            codeReporter: "123",
            perforation: "Perforación principal",
            drillHole: 5,
            direction: "Av. Siempre Viva 123",
            reason: "actualizado",
            dagmes_name: "",
            carCoste: 765,
            costerMaterials: 0,
            workersCoste: null,
            utilsCoste: 0,
            machineCoste: 0,
            recurringCoste: 45,
            waterCoste: 915.4,
            totalDamageCost: null
        }
        ],
            all: 1,
    };

    (repository.sumAmountByRegisterId as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.sumAmountByRegisterId).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
    });
});