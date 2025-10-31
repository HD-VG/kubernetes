/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateRegisterDto } from './create-register.dto';
import { IsInt, IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class UpdateRegisterDto extends PartialType(CreateRegisterDto) {
    @IsString()
    @IsNotEmpty()
    reason: string;
    
    @IsString()
    @IsNotEmpty()
    addressDagme: string;

    @IsString()
    @IsNotEmpty()
    dateDagme: Date;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'timeStart must be a valid time in the format HH:mm:ss',
    })
    timeStart: string;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'timeWater must be a valid time in the format HH:mm:ss',
    })
    timeWater: string

    @IsString()
    @IsNotEmpty()
    perforation: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsNumber()
    @IsNotEmpty()
    cite: number;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'timeInit must be a valid time in the format HH:mm:ss',
    })
    timeInit: string;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'timeEnd must be a valid time in the format HH:mm:ss',
    })
    timeEnd: string;
    
    @IsInt()
    @Min(1)
    drillHole: number;
}
