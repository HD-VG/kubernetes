/* eslint-disable prettier/prettier */
import { CreateSamplingUseCase } from 'src/application/cc_sampling/use-cases/create-sampling.use-case';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface';
import { CreateSamplingDto } from 'src/presentation/dtos/cc_sampling/index.dto';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';

describe('CreateSamplingUseCase', () => {
  let useCase: CreateSamplingUseCase;
  let samplingRepository: ISamplingRepository;

  beforeEach(() => {
    samplingRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateSamplingUseCase(samplingRepository);
  });

  it('should call samplingRepository.create with dto and userId, and return result', async () => {
    const dto: CreateSamplingDto = {
      sampleCode: 'SMP-001',
      typeCode: 'agua_potable',
      description: 'Muestra de pozo',
      sourceOfSupply: 'Pozo municipal',
      quantity: 10,
      sampleLocation: 'Zona Norte',
      samplePoint: 'Punto A',
      coordinatesX: '-17.783',
      coordinatesY: '-63.182',
      samplingTechnique: Technique.SIMPLE,
      samplingTechniqueM: 'Manual',
      statusPh: true,
      statusClr: false,
      ciResA: 1,
      ciResB: 2,
      condAmbT: 25,
      condAmbB: 60,
      samplingDay: new Date('2025-09-09'),
      samplingTime: '10:00',
      chainOfCustody: 1,
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Muestra creada correctamente' };

    (samplingRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(samplingRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});