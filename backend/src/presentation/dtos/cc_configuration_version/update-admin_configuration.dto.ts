/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdminConfigurationDto } from './create-admin_configuration.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminConfigurationDto extends PartialType(
  CreateAdminConfigurationDto,
) {
  @IsNotEmpty()
  id: number;

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
