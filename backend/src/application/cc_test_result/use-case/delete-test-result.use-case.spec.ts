/* eslint-disable prettier/prettier */
import { DeleteTestResultUseCase } from './index.use-case';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteTestResultUseCase', () => {
  let useCase: DeleteTestResultUseCase;
  let repository: ITestResultRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteTestResultUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
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

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});