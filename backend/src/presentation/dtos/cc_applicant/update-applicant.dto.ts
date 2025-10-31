/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateApplicantDto } from './create-applicant.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
}
