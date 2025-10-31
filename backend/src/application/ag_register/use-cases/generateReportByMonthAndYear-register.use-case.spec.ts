/* eslint-disable prettier/prettier */
import { GenerateReportByMonthAndYearRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';

describe('GenerateReportByMonthAndYearRegisterUseCase', () => {
    let useCase: GenerateReportByMonthAndYearRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
        generateReportByMonthAndYear: jest.fn(),
        } as any;

        useCase = new GenerateReportByMonthAndYearRegisterUseCase(repository);
    });

    it('should call repository.generateReportByMonthAndYear with correct parameters', async () => {
        const month = 9;
        const year = 2025;
        const expectedResult = { status: true, message: 'Registro encontrado',
        //lo que se espera en postman
            data: [{
            addressDagme: "string",   
            reason: "string",          
            reported: "string",      
            totalCost: 0,           
            createdAt: "2025-09-09T10:30:00.000Z",
            code: "string",            
            cite: 1234                
        }],
        all: 1,
        };

        (repository.generateReportByMonthAndYear as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(month,year);

        expect(repository.generateReportByMonthAndYear).toHaveBeenCalledWith(month,year);
        expect(result).toEqual(expectedResult);
    });
});