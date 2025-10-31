/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateTypeWaterDto } from './create-type_water.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTypeWaterDto extends PartialType(CreateTypeWaterDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  definition: string;

  @IsString()
  @IsNotEmpty()
  abbreviation: string;
}
