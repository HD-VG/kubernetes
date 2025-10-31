/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminConfigurationDto {
  @IsNotEmpty()
  @IsString()
  codeConfiguration: string;

  @IsNotEmpty()
  @IsString()
  versionConfiguration: string;

  @IsNotEmpty()
  @IsString()
  messageConfiguration: string;
}
