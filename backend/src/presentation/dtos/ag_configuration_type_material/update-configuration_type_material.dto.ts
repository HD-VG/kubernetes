/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateConfigurationTypeMaterialDto {
    @IsNumber()
        @IsOptional()
        register_id: number;
    
        @IsNumber()
        @IsOptional()
        materialas: number;
    
        @IsNumber()
        @IsOptional()
        quantity: number;
    
        @IsString()
        @IsOptional()
        unit: string
        @IsOptional()
        codigo: string;
        @IsOptional()
        padre: string;
        @IsOptional()
        nivel: number;
        @IsOptional()
        ramas: number;
        @IsOptional()
        nombre: string;
        @IsOptional()
        unidad: string;
        @IsOptional()
        valMinimo: number;
        @IsOptional()
        valMaximo: number;
        @IsOptional()
        precioUs: number;
        @IsOptional()
        PrecioBs: number;
        @IsOptional()
        tipoItem: string;
        @IsOptional()
        iAlmacen: string;
        @IsOptional()
        cantidadD: number;
        @IsOptional()
        cantidadH: number;
        @IsOptional()
        saldoCantidad: number;
        @IsOptional()
        debeBs: number;
        @IsOptional()
        HaberBs: number;
        @IsOptional()
        SaldoCosto: number
}
