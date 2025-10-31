/* eslint-disable prettier/prettier */
import { PrintResumenRegisterUseCase } from './resumen-register.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('PrintResumenRegisterUseCase', () => {  
    let useCase: PrintResumenRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
            printResumen: jest.fn(), 
        } as any;

        useCase = new PrintResumenRegisterUseCase(repository);  
    });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.printResumen with correct parameters', async () => { 
        const expectedResult = { 
            status: true, 
            message: 'Registro encontrado',
            data: {
                formattedData: [
                    {
                        id: 2,
                        reported_name: "MATIAS",
                        reported_lastname: "DAZA BARRON",
                        reported_ci: "13326396",
                        reported_phone: "69613005",
                        address: "Av. Siempre Viva 123",
                        date: "2025-08-27T04:00:00.000Z",
                        reason: "actualizado",
                        machineCost: 10,
                        utilCost: 10,
                        materialCost: 10,
                        carCost: 10,
                        assignmentUserCost: 10,
                        costeWater: 915.3815594397258,
                        registerTotalCost: 960.3815594397258,
                        coste_reccurring: 45
                    }
                ],
                totalCost: 960.3815594397258
            },
            all: 1,
        };

        (repository.printResumen as jest.Mock).mockResolvedValue(expectedResult); 

        const result = await useCase.execute(FindByUuid);

        expect(repository.printResumen).toHaveBeenCalledWith(FindByUuid);
        expect(result).toEqual(expectedResult);
    });
});