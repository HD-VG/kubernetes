/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConfigurationUexpDto {
  @IsNumber()
  @IsNotEmpty()
  minValue: number;

  @IsNumber()
  @IsNotEmpty()
  maxValue: number;

  @IsNumber()
  @IsNotEmpty()
  ld: number;

  @IsString()
  @IsNotEmpty()
  formula: string;

  @IsNotEmpty()
  @IsNumber()
  ctwId: number;
}
