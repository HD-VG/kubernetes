/* eslint-disable prettier/prettier */
import { CreateTestResultUseCase } from 'src/application/cc_test_result/use-case/create-test-result.use-case';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { CreateTestResultDto } from 'src/presentation/dtos/cc_test_result/index.dto';

describe('CreateTestResultUseCase', () => {
  let useCase: CreateTestResultUseCase;
  let repository: ITestResultRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateTestResultUseCase(repository);
  });

  it('should call repository.create with dto and userId, and return result', async () => {
    const dto: CreateTestResultDto = {
      parameter: 'pH',
      valueA: 7.2,
      valueB: 7.4,
      usedFormula: true,
      configuration_id: 101,
      configuration_limit_id: 'LIMIT-001',
      sampling_id: 1,
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Resultado registrado' };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});