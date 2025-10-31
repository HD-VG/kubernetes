/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateConfigurationUexpDto } from './create-configuration_uexp.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateConfigurationUexpDto extends PartialType(
  CreateConfigurationUexpDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
}
