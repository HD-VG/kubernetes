/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindById {
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  id: number;

  @IsOptional()
  @IsString()
  rol?: string;
}
