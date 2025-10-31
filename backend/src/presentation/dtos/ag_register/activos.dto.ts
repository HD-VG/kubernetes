import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CobConceptoDTO {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  padre: string;

  @IsNumber()
  nivel: number;

  @IsNumber()
  ramas: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  unidad: string;

  @IsNumber()
  valMinimo: number;

  @IsNumber()
  valMaximo: number;

  @IsNumber()
  precioUs: number;

  @IsNumber()
  PrecioBs: number;

  @IsString()
  @IsNotEmpty()
  tipoItem: string;

  @IsString()
  @IsNotEmpty()
  iAlmacen: string;

  @IsNumber()
  cantidadD: number;

  @IsNumber()
  cantidadH: number;

  @IsNumber()
  saldoCantidad: number;

  @IsNumber()
  debeBs: number;

  @IsNumber()
  HaberBs: number;

  @IsNumber()
  SaldoCosto: number;
}
