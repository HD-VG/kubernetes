/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateReportedDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'El Ci debe tener al menos 5 caracteres!' })
  ci: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  address: string;
}
