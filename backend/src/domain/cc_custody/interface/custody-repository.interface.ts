/* eslint-disable prettier/prettier */
import { FindById, GenerateReportDto, AnswerQuery } from 'src/common/dto/index.dto';
import {
    AdminConfigurationDTO,
    CreateChainOfCustodyDto,
    DataClass,
    UpdateChainOfCustodyDto
} from 'src/presentation/dtos/cc_custody/index.dto';

export interface ICustodyRepository {
    create(dto: CreateChainOfCustodyDto, user: number): Promise<AnswerQuery | null>;
    getConfiguration(id: number): Promise<any | null>;
    getCountCustody(): Promise<number | null>;
    update(id: number, dto: UpdateChainOfCustodyDto, userId: number): Promise<AnswerQuery | null>
    listCustody(): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    printChainOfCustody(dto: FindById): Promise<AnswerQuery | null>;
    getTransport(dto: number): Promise<any | null>;
    getApplicant(dto: number): Promise<any | null>;
    printChainOfCustodyPDF(dto: GenerateReportDto): Promise<any | null>
    getMaps(): Promise<AnswerQuery | null>;
    generateHeaderInfo(): Promise<any | null>;
    generateHeader(codigo: string, version: string): Promise<any | null>;
    generarPdfConHeaderAndFooter(dto: DataClass, header: AdminConfigurationDTO, generateReportDTO: GenerateReportDto): Promise<any | null>;
}