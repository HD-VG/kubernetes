/* eslint-disable prettier/prettier */
import { UpdateStandardUseCase } from 'src/application/cc_configuration_standard/use-cases/update-standard.use-case';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import { UpdateStandardDto } from 'src/presentation/dtos/cc_configuration_standard/update-standard.dto';

describe('UpdateStandardUseCase', () => {
    let useCase: UpdateStandardUseCase;
    let StandardRepository: IStandardRepository;

    beforeEach(() => {
        StandardRepository = {
            update: jest.fn(),
        } as any;

        useCase = new UpdateStandardUseCase(StandardRepository);
    });

    it('should call StandardRepository.Update with dto and userId, and return result', async () => {
        const dto: UpdateStandardDto = {
            id:1,
            name: 'ISO 9001',
            type: 'Quality',
        };

        const userId = 1;
        const expectedResult = { status: true, message: 'Standard Updated' };

        (StandardRepository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(1,dto, userId);

        expect(StandardRepository.update).toHaveBeenCalledWith(1,dto, userId);
        expect(result).toEqual(expectedResult);
    });
});