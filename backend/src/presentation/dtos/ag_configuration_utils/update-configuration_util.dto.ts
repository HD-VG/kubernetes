/* eslint-disable prettier/prettier */
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateConfigurationUtilDto{

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    basicCosteHour: number;
}
