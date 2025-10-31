/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWaterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    basicCoste: number;

    @IsNumber()
    @IsNotEmpty()
    height: number;

    @IsNumber()
    @IsNotEmpty()
    cohefficientDischarge: number;
}
