/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, Min, Matches, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRegisterDto {
    @IsInt()
    @IsNotEmpty()
    reporter: number;

    @IsInt()
    @IsNotEmpty()
    reported: number;
    
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

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConfigurationTypeMachine)
    configurationTypeMachines: ConfigurationTypeMachine[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConfigurationTypeDagme)
    configurationTypeDagmes: ConfigurationTypeDagme[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConfigurationTypeWork)
    configurationTypeWorks: ConfigurationTypeWork[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConfigurationUtil)
    configurationUtil: ConfigurationUtil[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AsignacionUserRol)
    assignment_user: AsignacionUserRol[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WorkerAssigment)
    workerAssigment: WorkerAssigment[]
}

export class ConfigurationTypeMachine {
    @IsInt()
    @IsNotEmpty()
    id: number;
}

export class ConfigurationTypeDagme {
    @IsInt()
    @IsNotEmpty()
    id: number;
}

export class ConfigurationTypeWork {
    @IsInt()
    @IsNotEmpty()
    id: number;
}

export class ConfigurationUtil {
    @IsInt()
    @IsNotEmpty()
    id: number;
}

export class AsignacionUserRol {
    @IsInt()
    @IsNotEmpty()
    id: number
}

export class WorkerAssigment {
    @IsInt()
    @IsNotEmpty()
    id: number
}