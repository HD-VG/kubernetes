/* eslint-disable prettier/prettier */
import { UpdateLaboratorySamplingUseCase } from './index.use-case';
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface'
import { UpdateSamplingLaboratoryDto } from 'src/presentation/dtos/cc_sampling/index.dto';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';
describe('UpdateLaboratorySamplingUseCase', () => {
  let useCase: UpdateLaboratorySamplingUseCase;
  let repository: ISamplingRepository;

  beforeEach(() => {
    repository = {
      updateLaboratory: jest.fn(),
    } as any;

    useCase = new UpdateLaboratorySamplingUseCase(repository);
  });

  it('should call repository.updateLaboratory with dto and userId, and return result', async () => {
    const dto: UpdateSamplingLaboratoryDto = {
      id:1,
      samplingConditions: ['uno'],
      samplingAceptation:'test',
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Resultado Actualizado' };

    (repository.updateLaboratory as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.updateLaboratory).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});