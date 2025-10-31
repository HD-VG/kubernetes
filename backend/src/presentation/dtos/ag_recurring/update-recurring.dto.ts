/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateRecurringDto } from './create-recurring.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateRecurringDto extends PartialType(CreateRecurringDto) {

    @IsOptional()
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    basicCoste: number;
}
