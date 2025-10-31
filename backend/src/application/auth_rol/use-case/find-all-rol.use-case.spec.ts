/* eslint-disable prettier/prettier */
import { FindAllRolUseCase } from './find-all-rol.use-case';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('FindAllRolUseCase', () => {
  let useCase: FindAllRolUseCase;
  let rolRepository: IRolRepository;

  beforeEach(() => {
    rolRepository = {
      list: jest.fn(),
    } as any;

    useCase = new FindAllRolUseCase(rolRepository);
  });

  it('should call rolRepository.list with correct pagination', async () => {
    const dto: PaginationDto = { limit: 10, offset: 0, parameter: '' };
    const expectedResult = {
      status: true,
      message: 'Records found',
      data: [{ id: 1, name: 'ADMIN', permisos: ['READ_USER'] }],
    };

    (rolRepository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(rolRepository.list).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});