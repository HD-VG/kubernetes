/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateConfigurationTypeMachineDto } from './create-configuration_type_machine.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateConfigurationTypeMachineDto extends PartialType(CreateConfigurationTypeMachineDto) {

    @IsString()
    @IsOptional()
    name: string;
  
    @IsNumber()
    @IsOptional()
    basicCoste: number;
}
