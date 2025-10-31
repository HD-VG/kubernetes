/* eslint-disable prettier/prettier */
import { FindByIdLimitUseCase } from './index.use-case';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdLimitUseCase', () => {
  let useCase: FindByIdLimitUseCase;
  let repository: ILimitRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdLimitUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
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

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});