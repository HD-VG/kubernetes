/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ListTestResultDto {
  @IsNotEmpty({ message: 'La muestra no deberia de estar Vacio!' })
  @IsNumber()
  sampling_id: number;

  @IsNotEmpty({ message: 'EL cusotdio no deberia de estar Vacio!' })
  @IsNumber()
  custody_id: number;

  @IsString()
  rol: string;
}