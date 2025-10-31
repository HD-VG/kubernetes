/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateConfigurationTypeWorkDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
