/* eslint-disable prettier/prettier */
import { UpdateSamplingUseCase } from './index.use-case';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface'
import { UpdateSamplingDto } from 'src/presentation/dtos/cc_sampling/index.dto';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';
describe('UpdateSamplingUseCase', () => {
  let useCase: UpdateSamplingUseCase;
  let repository: ISamplingRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateSamplingUseCase(repository);
  });

  it('should call repository.update with dto and userId, and return result', async () => {
    const dto: UpdateSamplingDto = {
      id:1,
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
    const expectedResult = { status: true, message: 'Resultado registrado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});