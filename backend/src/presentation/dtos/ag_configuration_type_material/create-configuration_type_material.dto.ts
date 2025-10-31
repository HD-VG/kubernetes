/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConfigurationTypeMaterialDto {

    @IsNumber()
    @IsNotEmpty()
    register_id: number;

    @IsNumber()
    @IsNotEmpty()
    materialas: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    unit: string
    @IsNotEmpty()
    codigo: string;
    @IsNotEmpty()
    padre: string;
    @IsNotEmpty()
    nivel: number;
    @IsNotEmpty()
    ramas: number;
    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    unidad: string;
    @IsNotEmpty()
    valMinimo: number;
    @IsNotEmpty()
    valMaximo: number;
    @IsNotEmpty()
    precioUs: number;
    @IsNotEmpty()
    PrecioBs: number;
    @IsNotEmpty()
    tipoItem: string;
    @IsNotEmpty()
    iAlmacen: string;
    @IsNotEmpty()
    cantidadD: number;
    @IsNotEmpty()
    cantidadH: number;
    @IsNotEmpty()
    saldoCantidad: number;
    @IsNotEmpty()
    debeBs: number;
    @IsNotEmpty()
    HaberBs: number;
    @IsNotEmpty()
    SaldoCosto: number
}
