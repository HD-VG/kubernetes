/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateReportTemplateDto } from './create-report_template.dto';

export class UpdateReportTemplateDto extends PartialType(
  CreateReportTemplateDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  codeCustody: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['agua_cruda', 'agua_potable', 'agua_residual', 'lodos'])
  typeCode: string;

  @IsString()
  codeReport: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  expectedParameters: string[];

  @IsBoolean()
  statusReport: boolean;
}
