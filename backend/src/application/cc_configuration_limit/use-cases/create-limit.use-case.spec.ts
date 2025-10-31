/* eslint-disable prettier/prettier */
import { CreateLimitUseCase } from 'src/application/cc_configuration_limit/use-cases/create-limit.use-case';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { CreateLimitDto } from 'src/presentation/dtos/cc_configuration_limit/create-limit.dto';

describe('CreateLimitUseCase', () => {
    let useCase: CreateLimitUseCase;
    let limitRepository: ILimitRepository;

    beforeEach(() => {
        limitRepository = {
            create: jest.fn(),
        } as any;

        useCase = new CreateLimitUseCase(limitRepository);
    });

    it('should call limitRepository.create with dto and userId, and return result', async () => {
        const dto: CreateLimitDto = {
            minValue: 1,
            maxValue: 5,
            absoluteValue: null,
            conditionalValue: null,
            specialCondition: null,
            standardId: 1,
            parameterId: 1,
        };

        const userId = 1;
        const expectedResult = { status: true, message: 'Limit created' };

        (limitRepository.create as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(dto, userId);

        expect(limitRepository.create).toHaveBeenCalledWith(dto, userId);
        expect(result).toEqual(expectedResult);
    });
});