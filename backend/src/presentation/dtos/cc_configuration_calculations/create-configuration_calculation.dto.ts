/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateConfigurationCalculationDto {
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
