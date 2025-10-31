/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateConfigurationCalculationDto } from './create-configuration_calculation.dto';

export class UpdateConfigurationCalculationDto extends PartialType(
    CreateConfigurationCalculationDto,
) {
    @IsNumber()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    formula: string;

    @IsString()
    @IsNotEmpty()
    instrumentUsed: string;

    @IsBoolean()
    @IsNotEmpty()
    approvedByApps: boolean;

    @IsBoolean()
    @IsNotEmpty()
    statusConfiguration: boolean;
}
