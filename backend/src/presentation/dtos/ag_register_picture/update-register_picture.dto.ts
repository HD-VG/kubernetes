/* eslint-disable prettier/prettier */
import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateRegisterPictureDto {
    
    @IsString()
    @IsOptional()
    pictureUrl: string;

    @IsOptional()
    file?: any

    @IsNumber()
    @IsOptional()
    register_id: number;
}
