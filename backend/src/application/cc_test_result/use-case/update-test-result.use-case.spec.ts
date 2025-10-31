/* eslint-disable prettier/prettier */
import { UpdateTestResultUseCase } from 'src/application/cc_test_result/use-case/index.use-case';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { UpdateTestResultDto } from 'src/presentation/dtos/cc_test_result/index.dto';

describe('UpdateTestResultUseCase', () => {
  let useCase: UpdateTestResultUseCase;
  let repository: ITestResultRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateTestResultUseCase(repository);
  });

  it('should call repository.update with dto and userId, and return result', async () => {
    const dto: UpdateTestResultDto = {
      id:1,
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

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});