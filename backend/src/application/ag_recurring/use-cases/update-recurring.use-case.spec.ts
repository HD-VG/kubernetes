/* eslint-disable prettier/prettier */
import { UpdateRecurringUseCase } from './index.use-case';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';
import { UpdateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
describe('UpdateRecurringUseCase', () => {
  let useCase: UpdateRecurringUseCase;
  let repository: IRecurringRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateRecurringUseCase(repository);
  });

    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateRecurringDto = {
      name: 'RecurringActualizado',
      basicCoste: 123
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
        id: 1,
        name: "RecurringActualizado",
        basicCoste: 123
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});