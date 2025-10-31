/* eslint-disable prettier/prettier */
import { ListSamplingUseCase } from 'src/application/cc_sampling/use-cases/list-sampling.use-case';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface';
import { FindById } from 'src/common/dto/index.dto';

describe('ListSamplingUseCase', () => {
  let useCase: ListSamplingUseCase;
  let samplingRepository: ISamplingRepository;

  beforeEach(() => {
    samplingRepository = {
      list: jest.fn(),
    } as any;

    useCase = new ListSamplingUseCase(samplingRepository);
  });

  it('should call samplingRepository.list with FindById dto and return result', async () => {
    const dto: FindById = { id: 1 };
    const expectedResult = {
      status: true,
      message: 'Muestras listadas',
      data: [
        {
          id: 1,
          sampleCode: 'SMP-001',
          typeCode: 'agua_potable',
          description: 'Muestra de pozo',
        },
      ],
    };

    (samplingRepository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(samplingRepository.list).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});