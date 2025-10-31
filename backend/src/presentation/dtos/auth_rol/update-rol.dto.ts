/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {

  @ApiProperty({
    example: 'nombre del rol',
    required: true,
  })
  @IsNotEmpty({ message: 'El campo name no deberia de estar vacio' })
  @IsString({ message: 'Deberia de ser un nombre de rol valido' })
  name: string;

  @ApiProperty({
    example: '4',
    required: false,
  })
  @IsOptional()
  permisosToAdd?: PermissionRolCreateDto[];

  @ApiProperty({
    example: '4',
    required: false,
  })
  @IsOptional()
  permisosToRemove?: PermissionRolAssignationUpdateDto[];
}

/**
 * Corresponde a 'PermissionRolCreate' en el frontend.
 * Usado para la creación de roles y para 'permisosToAdd'.
 */
export class PermissionRolCreateDto {
  @ApiProperty({ example: 5, description: 'ID numérico del permiso a asignar.' })
  @IsString({ message: 'El campo id_permission debe ser un string.' })
  @IsNotEmpty({ message: 'El ID de permiso no debe estar vacío.' })
  id_permission: string;
}

/**
 * Corresponde a 'PermissionRolAssignationUpdate' en el frontend.
 * Usado solo para 'permisosToRemove'.
 */
export class PermissionRolAssignationUpdateDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'UUID de la asignación Rol-Permiso que se debe eliminar.',
  })
  @IsUUID('4', { message: 'El campo id_aisgnacion debe ser un UUID válido.' })
  @IsString({ message: 'El campo id_aisgnacion debe ser un string.' })
  @IsNotEmpty({ message: 'El UUID de asignación no debe estar vacío.' })
  id_aisgnacion: string;
}
