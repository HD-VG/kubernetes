/* eslint-disable prettier/prettier */
import { CreateStandardUseCase } from 'src/application/cc_configuration_standard/use-cases/create-standard.use-case';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import { CreateStandardDto } from 'src/presentation/dtos/cc_configuration_standard/create-standard.dto';

describe('CreateStandardUseCase', () => {
  let useCase: CreateStandardUseCase;
  let standardRepository: IStandardRepository;

  beforeEach(() => {
    standardRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateStandardUseCase(standardRepository);
  });

  it('should call standardRepository.create with dto and userId, and return result', async () => {
    const dto: CreateStandardDto = {
      name: 'ISO 9001',
      type: 'Quality',
    };

    const userId = 1;
    const expectedResult = { status: true, message: 'Standard created' };

    (standardRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(standardRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});