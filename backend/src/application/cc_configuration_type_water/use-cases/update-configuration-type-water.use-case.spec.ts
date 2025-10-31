/* eslint-disable prettier/prettier */
import { UpdateConfigurationTypeWaterUseCase } from './update-configuration-type-water.use-case';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';
import { UpdateTypeWaterDto } from 'src/presentation/dtos/cc_configuration_type_water/index.dto';

describe('UpdateConfigurationTypeWaterUseCase', () => {
    let useCase: UpdateConfigurationTypeWaterUseCase;
    let ParameterRepository: IConfigurationTypeWaterRepository;

    beforeEach(() => {
        ParameterRepository = {
            update: jest.fn(),
        } as any;

        useCase = new UpdateConfigurationTypeWaterUseCase(ParameterRepository);
    });

    it('should call ParameterRepository.Update with dto and userId, and return result', async () => {
        const dto: UpdateTypeWaterDto = {
            id: 1,
            name: 'Agua Potable',
            definition: 'Agua apta para consumo humano',
            abbreviation: 'AP',
        };

        const userId = 1;
        const expectedResult = { status: true, message: 'Parameter Updated' };

        (ParameterRepository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(1,dto, userId);

        expect(ParameterRepository.update).toHaveBeenCalledWith(1,dto, userId);
        expect(result).toEqual(expectedResult);
    });
});