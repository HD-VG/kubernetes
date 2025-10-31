/* eslint-disable prettier/prettier */
import { CreateRolUseCase } from './create-rol.use-case';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { CreateRolDto } from 'src/presentation/dtos/auth_rol/create-rol.dto';

describe('CreateRolUseCase', () => {
  let useCase: CreateRolUseCase;
  let rolRepository: IRolRepository;

  beforeEach(() => {
    rolRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateRolUseCase(rolRepository);
  });

  it('should call rolRepository.create with correct parameters', async () => {
    const dto: CreateRolDto = {
      name: 'ADMIN',
      permisos: [{ id_permission: 1 }],
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Rol creado correctamente' };

    (rolRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(rolRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});