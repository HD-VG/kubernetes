/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeleteManyDto {
    @IsArray()
    @IsNotEmpty()
    uuid: string[];

    @IsOptional()
    @IsString()
    rol?: string;
}
