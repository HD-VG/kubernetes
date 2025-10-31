/* eslint-disable prettier/prettier */
import { FindByCustodyApplicantUseCase } from './index-applicant.use-case';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';

describe('FindByCustodyApplicantUseCase', () => {
    let useCase: FindByCustodyApplicantUseCase;
    let repository: IApplicantRepository;

    beforeEach(() => {
        repository = {
            findByCustodyId: jest.fn(),
        } as any;

        useCase = new FindByCustodyApplicantUseCase(repository);
    });

    it('should call repository.findByCustodyId with correct FindById', async () => {
        const dto = 1;

        const expectedResult = {
            status: true,
            message: 'Registros encontrados',
            data: [{
                id: 1,
                entityName: 'ELAPAS',
                location: 'Lima',
                phone: '123456789',
                referencePerson: 'Juan Perez',
            }],
            all: 1,
        };

        (repository.findByCustodyId as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(dto);

        expect(repository.findByCustodyId).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResult);
    });
});