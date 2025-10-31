/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';
import { GetMapsCustodyUseCase } from './index-custody.use-case'; 

describe('GetMapsCustodyUseCase', () => {
  let useCase: GetMapsCustodyUseCase;
  let mockRepository: jest.Mocked<ICustodyRepository>;

  beforeEach(async () => {
    mockRepository = {
      getMaps: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetMapsCustodyUseCase,
        {
          provide: ICustodyRepositoryToken,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetMapsCustodyUseCase>(GetMapsCustodyUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call repository getMaps and return the result successfully', async () => {
    const mockAnswerQuery = {
      message: 'Records found',
      status: true,
      data: [ ],
    };
    mockRepository.getMaps.mockResolvedValue(mockAnswerQuery);

    const result = await useCase.execute();

    expect(mockRepository.getMaps).toHaveBeenCalledTimes(1);
    expect(mockRepository.getMaps).toHaveBeenCalledWith();
    expect(result).toEqual(mockAnswerQuery);
  });

  it('should handle error from repository getMaps', async () => {
    const error = new Error('Repository error');
    mockRepository.getMaps.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow('Repository error');
    expect(mockRepository.getMaps).toHaveBeenCalledTimes(1);
  });
});