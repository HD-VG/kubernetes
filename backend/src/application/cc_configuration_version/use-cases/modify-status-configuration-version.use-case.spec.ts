/* eslint-disable prettier/prettier */
import { ModifyStatusConfigurationVersionUseCase } from './index-configuration-version.use-case';
import { IConfigurationVersionRepository } from 'src/domain/cc_configuration_version/interface/configuration_version.interface';
import { FindById } from 'src/common/dto/findById.dto';
describe('ModifyStatusConfigurationVersionUseCase', () => {
  let useCase: ModifyStatusConfigurationVersionUseCase;
  let repository: IConfigurationVersionRepository;

  beforeEach(() => {
    repository = {
      modify_status: jest.fn(),
    } as any;

    useCase = new ModifyStatusConfigurationVersionUseCase(repository);
  });

  it('should call repository.modify_status with correct parameters', async () => {
    const dto: FindById = {
              id: 1,
            };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.modify_status as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.modify_status).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});