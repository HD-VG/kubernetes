/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';
import { FindById } from 'src/common/dto/index.dto';
import { PrintCustodyUseCase } from './index-custody.use-case'; 

describe('PrintCustodyUseCase', () => {
  let useCase: PrintCustodyUseCase;
  let mockRepository: jest.Mocked<ICustodyRepository>;

  beforeEach(async () => {
    mockRepository = {
      printChainOfCustody: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrintCustodyUseCase,
        {
          provide: ICustodyRepositoryToken,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<PrintCustodyUseCase>(PrintCustodyUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call repository printChainOfCustody and return the result successfully', async () => {

    const mockDto: FindById = { } as any;
    const mockResult = { } as any;

    mockRepository.printChainOfCustody.mockResolvedValue(mockResult);

    const result = await useCase.execute(mockDto);

    expect(mockRepository.printChainOfCustody).toHaveBeenCalledTimes(1);
    expect(mockRepository.printChainOfCustody).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual(mockResult);
  });

  it('should handle error from repository printChainOfCustody', async () => {

    const mockDto: FindById = { } as any;
    const error = new Error('Repository error');

    mockRepository.printChainOfCustody.mockRejectedValue(error);

    await expect(useCase.execute(mockDto)).rejects.toThrow('Repository error');
    expect(mockRepository.printChainOfCustody).toHaveBeenCalledTimes(1);
  });
});