/* eslint-disable prettier/prettier */
import { FindByIdRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('FindByIdRegisterUseCase', () => {
    let useCase: FindByIdRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
        findById: jest.fn(),
        } as any;

        useCase = new FindByIdRegisterUseCase(repository);
    });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.findById with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registro encontrado',
        data: [{
            id: 1,
            reporter: 1,
            reported: 2,
            reason: "Reporte de actividad en terreno",
            addressDagme: "Av. Bolívar 123, Sucre",
            dateDagme: "2025-09-09",
            timeStart: "08:30:00",
            timeWater: "09:00:00",
            perforation: "Perforación inicial de pozo",
            code: "DAGME-001",
            cite: 1001,
            timeInit: "10:00:00",
            timeEnd: "15:30:00",
            drillHole: 3,
            userId: 5,
            configurationTypeMachines: [
                { id: 6 },
                { id: 7 },
                { id: 2 },
                { id: 3 }
            ],
            configurationTypeDagmes: [
                { id: 7 },
                { id: 8 }
            ],
            configurationTypeWorks: [
                { id: 7 },
                { id: 8 }
            ],
            configurationUtil: [
                { id: 7 },
                { id: 8 }
            ],
            assignment_user: [
                { id: 7 },
                { id: 8 }
            ],
            workerAssigment: [
                { id: 7 },
                { id: 8 }
            ]
        }],
        all: 1,
        };

        (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid);

        expect(repository.findById).toHaveBeenCalledWith(FindByUuid);
        expect(result).toEqual(expectedResult);
    });
});