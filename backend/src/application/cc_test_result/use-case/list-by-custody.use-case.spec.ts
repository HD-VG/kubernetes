/* eslint-disable prettier/prettier */
import { ListByCustodyTestResultUseCase } from 'src/application/cc_test_result/use-case/list-by-custody.use-case';
import { ITestResultRepository } from 'src/domain/cc_test_result/interface/test-result-repository.interface';
import { ListTestResultDto } from 'src/presentation/dtos/cc_test_result/list-by-custody-sampling.dto';

describe('ListByCustodyTestResultUseCase', () => {
  let useCase: ListByCustodyTestResultUseCase;
  let repository: ITestResultRepository;

  beforeEach(() => {
    repository = {
      listByCusdtody: jest.fn(),
    } as any;

    useCase = new ListByCustodyTestResultUseCase(repository);
  });

  it('should call repository.listByCusdtody with dto and return result', async () => {
    const dto: ListTestResultDto = {
      sampling_id: 1,
      custody_id: 2,
      rol: 'ADMIN',
    };

    const expectedResult = {
      status: true,
      message: 'Resultados encontrados',
      data: [
        {
          id: 1,
          parameter: 'pH',
          valueA: 7.2,
          valueB: 7.4,
          usedFormula: true,
        },
      ],
    };

    (repository.listByCusdtody as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.listByCusdtody).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});