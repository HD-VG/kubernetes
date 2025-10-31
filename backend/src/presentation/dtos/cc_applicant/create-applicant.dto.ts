/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicantDto {
  @IsString()
  @IsNotEmpty()
  entityName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  referencePerson: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  chainOfCustody: number
}
