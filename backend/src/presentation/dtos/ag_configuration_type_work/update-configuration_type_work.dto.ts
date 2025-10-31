/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class UpdateConfigurationTypeWorkDto {
    @IsOptional()
    @IsString()
    name: string
}

