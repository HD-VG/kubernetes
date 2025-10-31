/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateTestResultDto } from './create-test_result.dto';

export class UpdateTestResultDto extends PartialType(CreateTestResultDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

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

  @IsNumber()
  sampling_id: number;
}
