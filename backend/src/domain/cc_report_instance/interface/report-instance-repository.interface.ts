/* eslint-disable prettier/prettier */
import { FindById, GenerateReportDto, AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateReportInstanceDto,
} from 'src/presentation/dtos/cc_report_instance/index.dto';
import { IChainOfCustodySnapshot } from 'src/infrastructure/cc_report_instance/interface/screenshot.interface';
import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/header-info.dto';
import { ReportInstance } from '../entities/report_instance.entity';

export interface IReportInstanceRepository {
  create(dto: CreateReportInstanceDto, userId: number): Promise<AnswerQuery>;
  delete(findById: FindById, userId: number): Promise<AnswerQuery>;
  list(findById: FindById): Promise<AnswerQuery>;
  findById(findById: FindById): Promise<AnswerQuery>;
  count(options: { where: any }): Promise<number>;
  generateHeaderInfo(id: number): Promise<any | null>;
  generateHeader(codigo: string, version: string): Promise<any | null>;
  printReportInstancePDF(dto: GenerateReportDto): Promise<any | null>
  generarPdfConHeaderAndFooter(data: ReportInstance,dto: IChainOfCustodySnapshot, header: AdminConfigurationDTO, generateReportDTO: GenerateReportDto): Promise<any | null>;
}