/* eslint-disable prettier/prettier */ 
import { PartialType } from '@nestjs/swagger';
import { CreateConfigurationTypeDagmeDto } from './create-configuration_type_dagme.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateConfigurationTypeDagmeDto extends PartialType(CreateConfigurationTypeDagmeDto) {
    @IsString()
    @IsOptional()
    name: string
}
