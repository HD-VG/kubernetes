/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSamplingDto } from './create-sampling.dto';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';

export class UpdateSamplingDto extends PartialType(CreateSamplingDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    sampleCode: string;

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
    @IsNotEmpty()
    statusPh: boolean;

    @IsBoolean()
    @IsNotEmpty()
    statusClr: boolean;

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
}
