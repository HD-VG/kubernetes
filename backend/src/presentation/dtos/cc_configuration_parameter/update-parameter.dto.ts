/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateParameterDto } from './create-parameter.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateParameterDto extends PartialType(CreateParameterDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  testMethod: string;

  @IsNotEmpty()
  @IsString()
  testCode: string;
}
