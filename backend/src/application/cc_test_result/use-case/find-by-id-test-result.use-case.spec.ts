/* eslint-disable prettier/prettier */
import { FindByIdTestResultUseCase } from './index.use-case';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdTestResultUseCase', () => {
  let useCase: FindByIdTestResultUseCase;
  let repository: ITestResultRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdTestResultUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                parameter: 'pH',
                valueA: 7.2,
                valueB: 7.4,
                usedFormula: true,
                configuration_id: 101,
                configuration_limit_id: 'LIMIT-001',
                sampling_id: 1,
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});