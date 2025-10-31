/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { GenerateReportDto } from 'src/common/dto/index.dto';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';
import { ChainOfCustodyService } from 'src/infrastructure/cc_custody/services/chain_of_custody.service'
import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/header-info.dto';
import { Response } from 'express';

@Injectable()
export class PrintPdfCustodyUseCase {
  constructor(
    @Inject(ICustodyRepositoryToken)
    private readonly custodyRepository: ICustodyRepository,
    private readonly custodyServices: ChainOfCustodyService
  ) { }

  async execute(res: Response, findById: GenerateReportDto) {
    const header: AdminConfigurationDTO = await this.custodyServices.generateHeaderInfo();
    const data = await this.custodyServices.printChainOfCutodyPDF(findById)
    const pdfBuffer = await this.custodyServices.generateContent(data, header, findById);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="reporte_control_calidad_${data.codeCustody}.pdf"`);
    res.send(pdfBuffer);
  }
}
