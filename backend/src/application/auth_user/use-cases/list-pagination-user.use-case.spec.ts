/* eslint-disable prettier/prettier */
import { ListPaginationUserUseCase } from './list-pagination-user.use-case';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ListPaginationUserUseCase', () => {
  let useCase: ListPaginationUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      list: jest.fn(),
    } as any;

    useCase = new ListPaginationUserUseCase(userRepository);
  });

  it('should call userRepository.list with correct pagination', async () => {
    const dto: PaginationDto = { limit: 10, offset: 0, parameter: '' };
    const expectedResult = {
      status: true,
      message: 'Registros encontrados',
      data: [{ id: 1, name: 'Test User', rol: ['ADMIN'] }],
    };

    (userRepository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(userRepository.list).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});