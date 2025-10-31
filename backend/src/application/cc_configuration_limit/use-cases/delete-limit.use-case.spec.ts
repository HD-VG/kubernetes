/* eslint-disable prettier/prettier */
import { DeleteLimitUseCase } from './index.use-case';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteLimitUseCase', () => {
  let useCase: DeleteLimitUseCase;
  let repository: ILimitRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteLimitUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
      data: [{
                id: 1,
                minValue: 1,
                maxValue: 5,
                absoluteValue: null,
                conditionalValue: null,
                specialCondition: null,
                standardId: 1,
                parameterId: 1,
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});