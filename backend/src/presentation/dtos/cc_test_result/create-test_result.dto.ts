/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestResultDto {
  @IsNotEmpty()
  @IsString()
  parameter: string;

  @IsNotEmpty()
  @IsNumber()
  valueA: number;

  @IsNotEmpty()
  @IsNumber()
  valueB: number;

  @IsOptional()
  @IsBoolean()
  usedFormula?: boolean;

  @IsOptional()
  @IsNumber()
  configuration_id?: number;

  @IsNotEmpty()
  @IsString()
  configuration_limit_id?: string;

  @IsNumber()
  sampling_id: number;

}
