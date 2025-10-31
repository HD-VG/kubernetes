/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateChainOfCustodyDto, UpdateChainOfCustodyDto, AdminConfigurationDTO } from '../../../presentation/dtos/cc_custody/index.dto';
import { FindById, GenerateReportDto } from 'src/common/dto/index.dto'
import { DataClass } from '../../../presentation/dtos/cc_custody/print_sampling_report.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { ICustodyRepositoryToken } from 'src/application/cc_custody/tokens/custody-repository.tokens';
import { IPdfGenerator } from 'src/application/ports/pdf-generator.interface';

@Injectable()
export class ChainOfCustodyService implements IPdfGenerator {
  constructor(
    @Inject('ICustodyRepository')
    @Inject(ICustodyRepositoryToken)
    private readonly chainOfCustodyRepository: ICustodyRepository,
  ) { }

  // private async validateExistsOrThrow(id: number): Promise<AnswerQuery> {
  //   const entity = await this.chainOfCustodyRepository.findById({ id });
  //   if (!entity) {
  //     return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
  //   }
  //   return entity;
  // }
  // async create(
  //   createChainOfCustodyDto: CreateChainOfCustodyDto,
  //   userId: number,
  // ) {
  //   return await this.chainOfCustodyRepository.create(
  //     createChainOfCustodyDto,
  //     userId,
  //   );
  // }

  // async findAll() {
  //   return await this.chainOfCustodyRepository.listCustody();
  // }

  // async findOne(findById: FindById) {
  //   return await this.chainOfCustodyRepository.findById(findById);
  // }

  // async printChainOfCutody(findById: FindById) {
  //   await this.validateExistsOrThrow(findById.id);
  //   return await this.chainOfCustodyRepository.printChainOfCustody(findById)
  // }

  // // async generateContent(data: any, header: AdminConfigurationDTO, findById: GenerateReportDto): Promise<Buffer> {
  // //   // --- YOUR ACTUAL PDF GENERATION LOGIC GOES HERE ---
  // //   // This is where you'd use pdfmake, puppeteer, etc., to create the PDF buffer.
  // //   console.log('Generating PDF content with:', { data, header, findById });

  // //   // Example: Create a dummy PDF buffer for demonstration
  // //   // In a real application, you'd build the PDF using your chosen library
  // //   const dummyPdfContent = `
  // //     Reporte de Control de Calidad
  // //     -----------------------------
  // //     Header Info: ${JSON.stringify(header)}
  // //     Data: ${JSON.stringify(data)}
  // //     Query: ${JSON.stringify(findById)}
  // //     Generated at: ${new Date().toISOString()}
  // //   `;
  // //   const pdfBuffer = Buffer.from(dummyPdfContent, 'utf-8'); // This would be your PDF binary data

  // //   return pdfBuffer;
  // // }

  async printChainOfCutodyPDF(findById: FindById) {
    return await this.chainOfCustodyRepository.printChainOfCustodyPDF(findById)
  }

  // async getMaps() {
  //   return await this.chainOfCustodyRepository.getMaps();
  // }

  // async update(
  //   id: number,
  //   updateChainOfCustodyDto: UpdateChainOfCustodyDto,
  //   userId: number
  // ) {
  //   await this.validateExistsOrThrow(id);
  //   return await this.chainOfCustodyRepository.update(
  //     id,
  //     updateChainOfCustodyDto,
  //     userId
  //   );
  // }

  // async remove(
  //   findById: FindById,
  //   userId: number
  // ) {
  //   await this.validateExistsOrThrow(findById.id);
  //   return await this.chainOfCustodyRepository.delete(
  //     findById,
  //     userId
  //   );
  // }
  async generateHeaderInfo() {
    return await this.chainOfCustodyRepository.generateHeaderInfo();
  }
  async generateContent(data: DataClass, header: AdminConfigurationDTO, findById: GenerateReportDto) {
    return await this.chainOfCustodyRepository.generarPdfConHeaderAndFooter(data, header, findById);
  }
}
