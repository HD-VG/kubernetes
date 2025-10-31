import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRegisterMaterials {
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

    codigo?: string;
    padre?: string;
    nivel?: number;
    ramas?: number;
    nombre?: string;
    unidad?: string;
    valMinimo?: number;
    valMaximo?: number;
    precioUs?: number;
    PrecioBs?: number;
    tipoItem?: string;
    iAlmacen?: string;
    cantidadD?: number;
    cantidadH?: number;
    saldoCantidad?: number;
    debeBs?: number;
    HaberBs?: number;
    SaldoCosto?: number
}