/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateStandardDto } from './create-standard.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStandardDto extends PartialType(CreateStandardDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
