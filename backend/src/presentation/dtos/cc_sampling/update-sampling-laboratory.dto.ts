/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSamplingDto } from './create-sampling.dto';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class UpdateSamplingLaboratoryDto extends PartialType(CreateSamplingDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    samplingConditions: string[];

    @IsNotEmpty()
    @IsString()
    samplingAceptation: string;
}
