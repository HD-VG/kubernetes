/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';
import { GenerateReportDto } from 'src/common/dto/index.dto';
import { ChainOfCustodyService } from 'src/infrastructure/cc_custody/services/chain_of_custody.service';
import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/header-info.dto';
import { Response } from 'express';
import { PrintPdfCustodyUseCase } from './index-custody.use-case'; // Ajusta la ruta según tu estructura de archivos

describe('PrintPdfCustodyUseCase', () => {
  let useCase: PrintPdfCustodyUseCase;
  let mockCustodyRepository: jest.Mocked<ICustodyRepository>;
  let mockCustodyServices: jest.Mocked<ChainOfCustodyService>;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockCustodyRepository = {} as any; // No se usa en execute, pero se inyecta

    mockCustodyServices = {
      generateHeaderInfo: jest.fn(),
      printChainOfCutodyPDF: jest.fn(),
      generateContent: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrintPdfCustodyUseCase,
        {
          provide: ICustodyRepositoryToken,
          useValue: mockCustodyRepository,
        },
        {
          provide: ChainOfCustodyService,
          useValue: mockCustodyServices,
        },
      ],
    }).compile();

    useCase = module.get<PrintPdfCustodyUseCase>(PrintPdfCustodyUseCase);

    mockResponse = {
      setHeader: jest.fn(),
      send: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate and send PDF custody report successfully', async () => {
    // Arrange
    const mockFindById: GenerateReportDto = { /* Define propiedades mínimas del DTO según sea necesario, ej: { id: 1 } */ } as any;
    const mockHeader: AdminConfigurationDTO = { /* Mock de header, ej: { title: 'Test' } */ } as any;
    const mockData = {
      codeCustody: 'CUSTODY_001',
    };
    const mockPdfBuffer = Buffer.from('mock-pdf-content');

    mockCustodyServices.generateHeaderInfo.mockResolvedValue(mockHeader);
    mockCustodyServices.printChainOfCutodyPDF.mockResolvedValue(mockData);
    mockCustodyServices.generateContent.mockResolvedValue(mockPdfBuffer);

    // Act
    await useCase.execute(mockResponse as Response, mockFindById);

    // Assert
    expect(mockCustodyServices.generateHeaderInfo).toHaveBeenCalledTimes(1);
    expect(mockCustodyServices.generateHeaderInfo).toHaveBeenCalledWith();
    expect(mockCustodyServices.printChainOfCutodyPDF).toHaveBeenCalledWith(mockFindById);
    expect(mockCustodyServices.generateContent).toHaveBeenCalledWith(mockData, mockHeader, mockFindById);
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'inline; filename="reporte_control_calidad_CUSTODY_001.pdf"',
    );
    expect(mockResponse.send).toHaveBeenCalledWith(mockPdfBuffer);
  });

  it('should handle errors from services and not send response', async () => {
    // Arrange
    const mockFindById: GenerateReportDto = { /* ... */ } as any;
    const error = new Error('Service error');

    mockCustodyServices.generateHeaderInfo.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(mockResponse as Response, mockFindById)).rejects.toThrow('Service error');
    expect(mockResponse.send).not.toHaveBeenCalled();
    expect(mockResponse.setHeader).not.toHaveBeenCalled();
  });
});