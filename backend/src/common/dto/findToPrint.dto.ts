/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class GenerateReportDto {
  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsIn(['LETTER', 'LEGAL'], { message: 'El tamaño de papel debe ser LETTER o LEGAL' })
  pageSize?: 'LETTER' | 'LEGAL';

  @IsOptional()
  @IsIn(['portrait', 'landscape'], { message: 'La orientación debe ser portrait o landscape' })
  orientation?: 'portrait' | 'landscape';

  @IsNotEmpty({ message: 'El identificador del usuario es obligatorio' })
  id: number;

  @IsOptional()
  @IsString({ message: 'El rol debe ser un texto válido' })
  rol?: string;

  @IsOptional()
  @IsString({ message: 'El usuario debe ser un texto válido' })
  user?: string;
}
