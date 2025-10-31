/* eslint-disable prettier/prettier */
import { UpdateLimitUseCase } from 'src/application/cc_configuration_limit/use-cases/update-limit.use-case';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { UpdateLimitDto } from 'src/presentation/dtos/cc_configuration_limit/update-limit.dto';

describe('UpdateLimitUseCase', () => {
    let useCase: UpdateLimitUseCase;
    let limitRepository: ILimitRepository;

    beforeEach(() => {
        limitRepository = {
            update: jest.fn(),
        } as any;

        useCase = new UpdateLimitUseCase(limitRepository);
    });

    it('should call limitRepository.Update with dto and userId, and return result', async () => {
        const dto: UpdateLimitDto = {
            id:1,
            minValue: 1,
            maxValue: 5,
            absoluteValue: null,
            conditionalValue: null,
            specialCondition: null,
            standardId: 1,
            parameterId: 1,
        };

        const userId = 1;
        const expectedResult = { status: true, message: 'Limit Updated' };

        (limitRepository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(1,dto, userId);

        expect(limitRepository.update).toHaveBeenCalledWith(1,dto, userId);
        expect(result).toEqual(expectedResult);
    });
});