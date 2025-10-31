/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportTemplateDto {

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
