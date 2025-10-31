/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer"

export class CreateRegisterPictureDto {
    
    @IsString()
    @IsOptional()
    pictureUrl: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    register_id: number;
}

