/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChainOfCustodyDto {
  @IsNotEmpty()
  @IsBoolean()
  laboratoryMB: boolean;

  @IsNotEmpty()
  @IsBoolean()
  laboratoryFQ: boolean;

  @IsNotEmpty()
  @IsString()
  codeThermohygrometer: string;

  @IsNotEmpty()
  @IsString()
  codeThermometerMM: string;

  @IsNotEmpty()
  @IsString()
  codeThermometer: string;

  @IsNotEmpty()
  @IsString()
  codeColorimeter: string;

  @IsNotEmpty()
  @IsString()
  initialConservative: string;

  @IsNotEmpty()
  @IsNumber()
  configurationVersion: number;
}
