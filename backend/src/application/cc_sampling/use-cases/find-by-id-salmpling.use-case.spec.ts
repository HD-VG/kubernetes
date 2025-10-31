/* eslint-disable prettier/prettier */
import { FindByIdtSamplingUseCase } from './index.use-case';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';
describe('FindByIdtSamplingUseCase', () => {
  let useCase: FindByIdtSamplingUseCase;
  let repository: ISamplingRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdtSamplingUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
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
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});