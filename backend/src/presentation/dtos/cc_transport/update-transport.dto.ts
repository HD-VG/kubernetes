/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateTransportDto } from './create-transport.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTransportDto extends PartialType(CreateTransportDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  responsable: string;

  @IsNotEmpty()
  @IsString()
  distanceTraveled: string;

  @IsNotEmpty()
  @IsString()
  conservativeArrivalStretch: string;

  @IsNotEmpty()
  @IsString()
  maximumStretch: string;

  @IsNotEmpty()
  @IsString()
  initDate: Date;

  @IsNotEmpty()
  @IsString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  initTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;
}
