/* eslint-disable prettier/prettier */
import { ListPaginationPermissionUseCase } from './list.use-case';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListPaginationPermissionUseCase', () => {
  let useCase: ListPaginationPermissionUseCase;
  let repository: IPermissionRepository;

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    } as any;

    useCase = new ListPaginationPermissionUseCase(repository);
  });

  it('should call repository.list with correct pagination', async () => {
    const dto: PaginationDto = { limit: 10, offset: 0, parameter: '' };
    const expectedResult = {
      status: true,
      message: 'Records found',
      data: [{ id: 1, name: 'READ_USER' }],
      all: [{ id: 1, name: 'READ_USER' }],
    };

    (repository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.list).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
