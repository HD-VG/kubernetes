/* eslint-disable prettier/prettier */
import { ListStandardUseCase } from 'src/application/cc_configuration_standard/use-cases/list-standard.use-case';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';

describe('ListStandardUseCase', () => {
  let useCase: ListStandardUseCase;
  let standardRepository: IStandardRepository;

  beforeEach(() => {
    standardRepository = {
      list: jest.fn(),
    } as any;

    useCase = new ListStandardUseCase(standardRepository);
  });

  it('should call standardRepository.list and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Standards listed',
      data: [
        { id: 1, name: 'ISO 9001', type: 'Quality' },
        { id: 2, name: 'ISO 14001', type: 'Environmental' },
      ],
    };

    (standardRepository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(standardRepository.list).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});