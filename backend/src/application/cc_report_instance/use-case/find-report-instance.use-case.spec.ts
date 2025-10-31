/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { IReportInstanceRepositoryToken } from '../tokens/report-instance-repository.token';
import { Response } from 'express';
import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/header-info.dto';
import { GenerateReportDto } from 'src/common/dto/findToPrint.dto';
import { FindReportInstanceUseCase } from './find-report-instance.use-case'; 

describe('FindReportInstanceUseCase', () => {
  let service: FindReportInstanceUseCase;
  let mockRepository: jest.Mocked<IReportInstanceRepository>;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockRepository = {
      printReportInstancePDF: jest.fn(),
      generateHeaderInfo: jest.fn(),
      generarPdfConHeaderAndFooter: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindReportInstanceUseCase,
        {
          provide: IReportInstanceRepositoryToken,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindReportInstanceUseCase>(FindReportInstanceUseCase);

    mockResponse = {
      setHeader: jest.fn(),
      send: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate and send PDF report successfully', async () => {
    // Arrange
    const mockDto: GenerateReportDto = { } as any;
    const mockData = {
      summary: { configurationVersion: { id: 123 } },
      codeCustody: 'CUSTODY_001',
    };
    const mockHeader: AdminConfigurationDTO = {  } as any;
    const mockPdfBuffer = Buffer.from('mock-pdf-content');

    mockRepository.printReportInstancePDF.mockResolvedValue(mockData);
    mockRepository.generateHeaderInfo.mockResolvedValue(mockHeader);
    mockRepository.generarPdfConHeaderAndFooter.mockResolvedValue(mockPdfBuffer);

    await service.execute(mockResponse as Response, mockDto);

    expect(mockRepository.printReportInstancePDF).toHaveBeenCalledWith(mockDto);
    expect(mockRepository.generateHeaderInfo).toHaveBeenCalledWith(123);
    expect(mockRepository.generarPdfConHeaderAndFooter).toHaveBeenCalledWith(
      mockData,
      mockData.summary,
      mockHeader,
      mockDto,
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'attachment; filename="reporte_control_calidad_CUSTODY_001_Control_minimo_agua_potable.pdf"',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'X-Filename',
      'reporte_control_calidad_CUSTODY_001_Control_minimo_agua_potable.pdf',
    );
    expect(mockResponse.send).toHaveBeenCalledWith(mockPdfBuffer);
  });

  it('should handle errors from repository and not send response', async () => {

    const mockDto: GenerateReportDto = { } as any;
    const error = new Error('Repository error');

    mockRepository.printReportInstancePDF.mockRejectedValue(error);

    await expect(service.execute(mockResponse as Response, mockDto)).rejects.toThrow('Repository error');
    expect(mockResponse.send).not.toHaveBeenCalled();
    expect(mockResponse.setHeader).not.toHaveBeenCalled();
  });
});