/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParameterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  testMethod: string;

  @IsNotEmpty()
  @IsString()
  testCode: string;
}
