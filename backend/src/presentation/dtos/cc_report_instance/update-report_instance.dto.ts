/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateReportInstanceDto } from './create-report_instance.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { TestType } from 'src/domain/cc_report_instance/enum/test_type';
import { WaterTypeCode } from 'src/domain/cc_report_instance/enum/water_code';

export class UpdateReportInstanceDto extends PartialType(
  CreateReportInstanceDto,
) {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TestType)
  testType: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(WaterTypeCode)
  typeCode: string;

  @IsString()
  @IsOptional()
  codeCustody?: string;

  @IsString()
  @IsOptional()
  reportCode?: string;

  @IsNumber()
  @IsOptional()
  reportYear?: number;

  @IsOptional()
  @IsObject()
  summary?: object;

  @IsString()
  statusReport?: string;
}
