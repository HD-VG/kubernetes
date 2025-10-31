/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLimitDto {
  @IsOptional()
  @IsNumber()
  minValue: number | null;

  @IsOptional()
  @IsNumber()
  maxValue: number | null;

  @IsOptional()
  @IsNumber()
  absoluteValue: number | null;

  @IsOptional()
  @IsString()
  conditionalValue: string | null;

  @IsOptional()
  @IsString()
  specialCondition: string | null;

  @IsNotEmpty()
  @IsNumber()
  standardId: number;

  @IsNotEmpty()
  @IsNumber()
  parameterId: number;
}
