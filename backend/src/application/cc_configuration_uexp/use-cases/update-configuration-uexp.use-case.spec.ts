/* eslint-disable prettier/prettier */
import { UpdateConfigurationUexpUseCase } from './index.use-case';
import { UpdateConfigurationUexpDto } from 'src/presentation/dtos/cc_configuration_uexp/update-configuration_uexp.dto';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';

describe('UpdateConfigurationUexpUseCase', () => {
    let useCase: UpdateConfigurationUexpUseCase;
    let ParameterRepository: IConfigurationUexpRepository;

    beforeEach(() => {
        ParameterRepository = {
            update: jest.fn(),
        } as any;

        useCase = new UpdateConfigurationUexpUseCase(ParameterRepository);
    });

    it('should call ParameterRepository.Update with dto and userId, and return result', async () => {
        const dto: UpdateConfigurationUexpDto = {
            id: 1,
            minValue: 1,
            maxValue: 5,
            ld: 3.5,
            formula: 'x-0.1542',
            ctwId: 1,
        };

        const userId = 1;
        const expectedResult = { status: true, message: 'Parameter Updated' };

        (ParameterRepository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(1,dto, userId);

        expect(ParameterRepository.update).toHaveBeenCalledWith(1,dto, userId);
        expect(result).toEqual(expectedResult);
    });
});