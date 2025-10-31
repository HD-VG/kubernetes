/* eslint-disable prettier/prettier */
import { UpdateParameterUseCase } from 'src/application/cc_configuration_parameter/use-cases/update-parameter.use-case';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { UpdateParameterDto } from 'src/presentation/dtos/cc_configuration_parameter/update-parameter.dto';

describe('UpdateParameterUseCase', () => {
    let useCase: UpdateParameterUseCase;
    let ParameterRepository: IParameterRepository;

    beforeEach(() => {
        ParameterRepository = {
            update: jest.fn(),
        } as any;

        useCase = new UpdateParameterUseCase(ParameterRepository);
    });

    it('should call ParameterRepository.Update with dto and userId, and return result', async () => {
        const dto: UpdateParameterDto = {
            id: 1,
            name: 'pH',
            unit: 'mg/L',
            testMethod: 'Colorimetry',
            testCode: 'PH001',
        };

        const userId = 1;
        const expectedResult = { status: true, message: 'Parameter Updated' };

        (ParameterRepository.update as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(1,dto, userId);

        expect(ParameterRepository.update).toHaveBeenCalledWith(1,dto, userId);
        expect(result).toEqual(expectedResult);
    });
});