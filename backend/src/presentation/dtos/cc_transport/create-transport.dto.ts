/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransportDto {
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

  @IsNotEmpty()
  @IsNumber()
  chainOfCustody: number;
}
