/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { TestType } from 'src/domain/cc_report_instance/enum/test_type'
import { WaterTypeCode } from 'src/domain/cc_report_instance/enum/water_code'
export class CreateReportInstanceDto {

  @IsNumber()
  @IsNotEmpty()
  chainOfCustody: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TestType)
  testType: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(WaterTypeCode)
  waterCode: string;

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
  @IsOptional()
  statusReport?: string;

}
