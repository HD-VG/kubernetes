/* eslint-disable prettier/prettier */
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateWaterDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    basicCoste: number;

    @IsNumber()
    @IsOptional()
    height: number;

    @IsNumber()
    @IsOptional()
    cohefficientDischarge: number;
}
