/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateConfigurationCalculationUseCase } from './create-configuration-calculation.use-case';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';
import { IConfigurationCalculationRepositoryToken } from '../tokens/configuration_calculation.tokens';

describe('CreateConfigurationCalculationUseCase', () => {
  let useCase: CreateConfigurationCalculationUseCase;
  let mockRepository: jest.Mocked<IConfigurationCalculationRepository>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      // agrega los otros métodos de tu interfaz si es necesario
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateConfigurationCalculationUseCase,
        {
          provide: IConfigurationCalculationRepositoryToken,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateConfigurationCalculationUseCase>(
      CreateConfigurationCalculationUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.create with dto and userId', async () => {
    const dto = { name: 'test' } as any;
    const userId = 1;
    mockRepository.create.mockResolvedValue({ id: 1, ...dto });

    const result = await useCase.execute(dto, userId);

    expect(mockRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual({ id: 1, ...dto });
  });
});
