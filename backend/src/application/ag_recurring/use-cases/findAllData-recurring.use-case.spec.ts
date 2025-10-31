/* eslint-disable prettier/prettier */
import { FindAllDataRecurringUseCase } from './index.use-case';
import { IRecurringRepository } from 'src/domain/ag_recurring/interface/recurring.interface';

describe('FindAllDataRecurringUseCase', () => {
  let useCase: FindAllDataRecurringUseCase;
  let repository: IRecurringRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataRecurringUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
      data: [{
                id: 1,
                name: "Recurring",
                basicCoste:123
            },
            {
                id: 2,
                name: "Recurring",
                basicCoste:123
            }],
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});