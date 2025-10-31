/* eslint-disable prettier/prettier */
import { CreateRecurringUseCase } from './index.use-case';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { CreateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateRecurringUseCase', () => {
  let useCase: CreateRecurringUseCase;
  let repository: IRecurringRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateRecurringUseCase(repository);
  });
  const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateRecurringDto = {
      name: "recurring",
      basicCoste: 123
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
                id: 1,
                name: 'recurring',
                basicCoste: 123
            }],
            all: 1,
      };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});