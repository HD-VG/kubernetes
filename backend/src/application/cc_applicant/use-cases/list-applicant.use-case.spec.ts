/* eslint-disable prettier/prettier */
import { ListApplicantUseCase } from './index-applicant.use-case';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { FindById } from 'src/common/dto/findById.dto'

describe('ListApplicantUseCase', () => {
    let useCase: ListApplicantUseCase;
    let repository: IApplicantRepository;
    const dto: FindById = {
          id: 1,
        };
    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListApplicantUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                id: 1,
                entityName: 'ELAPAS',
                location: 'Lima',
                phone: '123456789',
                referencePerson: 'Juan Perez',
                chainOfCustody: 5,
                },
                {
                id: 2,
                entityName: 'ELAPAS',
                location: 'Lima',
                phone: '123456789',
                referencePerson: 'Juan Perez',
                chainOfCustody: 5,
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(dto);

        expect(repository.list).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResult);
    });
});