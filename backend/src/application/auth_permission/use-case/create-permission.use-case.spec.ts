/* eslint-disable prettier/prettier */
import { CreatePermissionUseCase } from './create-permission.use-case';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { CreatePermissionDto } from '../../../presentation/dtos/auth_permission/index.dto';

describe('CreatePermissionUseCase', () => {
  let useCase: CreatePermissionUseCase;
  let repository: IPermissionRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreatePermissionUseCase(repository);
  });

  it('should call repository.create with correct parameters', async () => {
    const dto: CreatePermissionDto = { name: 'READ_USER' };
    const userId = 1;
    const expectedResult = {
      status: true,
      message: 'Permission created successfully',
    };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});
