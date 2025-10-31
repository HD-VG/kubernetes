/* eslint-disable prettier/prettier */
import { DeleteRecurringUseCase } from './index.use-case';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteRecurringUseCase', () => {
  let useCase: DeleteRecurringUseCase;
  let repository: IRecurringRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteRecurringUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.delete with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                name: 'Recurring',
                basicCoste: 123
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, user);

    expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
    expect(result).toEqual(expectedResult);
  });
});