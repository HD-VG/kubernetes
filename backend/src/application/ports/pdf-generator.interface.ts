/* eslint-disable prettier/prettier */
// src/application/ports/pdf-generator.interface.ts

import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/index.dto'; // Or wherever your DTOs are
import { GenerateReportDto } from 'src/common/dto/index.dto'; // Your input DTO

/**
 * @interface IPdfGenerator
 * @description Defines the contract for generating PDF reports.
 */
export interface IPdfGenerator {
  generateContent(
    data: any,
    header: AdminConfigurationDTO,
    findById: GenerateReportDto,
  ): Promise<Buffer>;
}

export const IPdfGeneratorToken = 'IPdfGenerator'; // Token for dependency injection