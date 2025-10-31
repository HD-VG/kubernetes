/* eslint-disable prettier/prettier */
import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { CreateUserDto } from 'src/presentation/dtos/auth_user/create-user.dto';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateUserUseCase(userRepository);
  });

  it('should call userRepository.create with correct parameters', async () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
      password: 'securePass123',
      name: 'Test User',
      username: 'testuser',
      roles: [{ id_rol: 1 }],
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'User created', data: { id: 1 } };

    (userRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(userRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});