/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateLimitDto } from './create-limit.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateLimitDto extends PartialType(CreateLimitDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  minValue: number;

  @IsNotEmpty()
  @IsNumber()
  maxValue: number;

  @IsNotEmpty()
  @IsNumber()
  absoluteValue: number;

  @IsNotEmpty()
  @IsString()
  conditionalValue: string;

  @IsNotEmpty()
  @IsString()
  specialCondition: string;

  @IsNotEmpty()
  @IsNumber()
  standardId: number;

  @IsNotEmpty()
  @IsNumber()
  parameterId: number;
}
