/* eslint-disable prettier/prettier */
import { ListLimitUseCase } from './index.use-case';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { FindById } from 'src/common/dto/findById.dto'

describe('ListLimitUseCase', () => {
    let useCase: ListLimitUseCase;
    let repository: ILimitRepository;
    beforeEach(() => {
        repository = {
        list: jest.fn(),
        } as any;

        useCase = new ListLimitUseCase(repository);
    });

    it('should call repository.list with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registros encontrados',
        data: [{
                id: 1,
                minValue: 1,
                maxValue: 5,
                absoluteValue: null,
                conditionalValue: null,
                specialCondition: null,
                standardId: 1,
                parameterId: 1,
                },
                {
                id: 2,
                minValue: 1,
                maxValue: 5,
                absoluteValue: null,
                conditionalValue: null,
                specialCondition: null,
                standardId: 1,
                parameterId: 1,
                }],
                all: 2,
        };

        (repository.list as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute();

        expect(repository.list).toHaveBeenCalledWith();
        expect(result).toEqual(expectedResult);
    });
});