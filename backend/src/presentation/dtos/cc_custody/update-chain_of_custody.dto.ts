/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateChainOfCustodyDto } from './create-chain_of_custody.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChainOfCustodyDto extends PartialType(
    CreateChainOfCustodyDto,
) {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    codeCustody: string;

    @IsNotEmpty()
    @IsBoolean()
    laboratoryMB: boolean;

    @IsNotEmpty()
    @IsBoolean()
    laboratoryFQ: boolean;

    @IsNotEmpty()
    @IsString()
    codeThermohygrometer: string;

    @IsNotEmpty()
    @IsString()
    codeThermometerMM: string;

    @IsNotEmpty()
    @IsString()
    codeThermometer: string;

    @IsNotEmpty()
    @IsString()
    codeColorimeter: string;

    @IsNotEmpty()
    @IsString()
    initialConservative: string;
}
