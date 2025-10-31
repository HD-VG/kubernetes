/* eslint-disable prettier/prettier */
import { ModifyStatusAppsConfigurationCalculationUseCase } from './modify-status-apps-configutarion-calculation.use.case';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { FindById } from 'src/common/dto/findById.dto';
describe('ModifyStatusAppsConfigurationCalculationUseCase', () => {
  let useCase: ModifyStatusAppsConfigurationCalculationUseCase;
  let repository: IConfigurationCalculationRepository;

  beforeEach(() => {
    repository = {
      modify_status_apps: jest.fn(),
    } as any;

    useCase = new ModifyStatusAppsConfigurationCalculationUseCase(repository);
  });

  it('should call repository.modify_status_apps with correct parameters', async () => {
    const dto: FindById = {
              id: 1,
            };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.modify_status_apps as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.modify_status_apps).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});