/* eslint-disable prettier/prettier */
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';

export class CreateSamplingDto {

    @IsNotEmpty()
    @IsString()
    sampleCode: string;

    @IsNotEmpty()
    @IsString()
    typeCode: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    sourceOfSupply: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    sampleLocation: string;

    @IsNotEmpty()
    @IsString()
    samplePoint: string;

    @IsNotEmpty()
    @IsString()
    coordinatesX: string;

    @IsNotEmpty()
    @IsString()
    coordinatesY: string;

    @IsNotEmpty()
    @IsEnum(Technique)
    samplingTechnique: Technique;

    @IsNotEmpty()
    @IsString()
    samplingTechniqueM: string;

    @IsBoolean()
    @IsOptional()
    statusPh?: boolean;

    @IsBoolean()
    @IsOptional()
    statusClr?: boolean;

    @IsNotEmpty()
    @IsNumber()
    ciResA: number;

    @IsNotEmpty()
    @IsNumber()
    ciResB: number;

    @IsNotEmpty()
    @IsNumber()
    condAmbT: number;

    @IsNotEmpty()
    @IsNumber()
    condAmbB: number;

    @IsNotEmpty()
    @IsDateString()
    samplingDay: Date;

    @IsNotEmpty()
    @IsString()
    samplingTime: string;

    @IsNotEmpty()
    @IsNumber()
    chainOfCustody: number;
}
