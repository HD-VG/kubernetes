/* eslint-disable prettier/prettier */
import { IsOptional,IsNumber, Matches} from "class-validator";

export class UpdateConfigurationCarDto {
    @IsNumber()
    @IsOptional()
    register_id: number;

    @IsNumber()
    @IsOptional()
    car: number;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {message: 'time must be a valid time in the format HH:mm:ss',})
    @IsOptional()
    time: string;
}