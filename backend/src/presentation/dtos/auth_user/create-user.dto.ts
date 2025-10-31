/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    example: 'alguien@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'El campo correo deberia ser un correo valido' })
  @IsNotEmpty({ message: 'El campo correo no deberia de estar vacio' })
  @IsString({ message: 'El campo correo deberia ser un conjunto de caracteres' })
  email: string;

  @ApiProperty({
    example: 'contraseña segura mas de 6 caracteres',
    required: true,
  })
  @IsNotEmpty({ message: 'El campo contraseña no deberia de estar vacio' })
  @IsString({ message: 'El campo correo deberia ser un conjunto de caracteres' })
  password: string;

  @ApiProperty({
    example: 'pedro cabezas',
    required: true,
  })
  @IsString({ message: 'El campo nombre no deberia de estar vacio' })
  @IsNotEmpty({ message: 'El campo correo deberia ser un conjunto de caracteres' })
  name: string;

  @ApiProperty({
    example: 'pedrito123',
    required: true,
  })
  @IsString({ message: 'El campo correo deberia ser un conjunto de caracteres' })
  @IsNotEmpty({ message: 'El campo username no deberia de estar vacio' })
  username: string;

  @ApiProperty({
    example: '{"id_rol":1,"name":"admin"}',
    required: true,
  })
  @IsOptional()
  roles: Rol[]

}

export class Rol {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'UUID del Rol que se agregara.',
  })
  @IsUUID('4', { message: 'El campo id_rol debe ser un UUID válido.' })
  @IsString({ message: 'El campo id_rol debe ser un string.' })
  @IsNotEmpty({ message: 'El UUID del rol no debe estar vacío.' })
  id_rol: string;

  @ApiProperty({
    example: 'administrador',
    description: 'Rol reconocido desde el sistema para unirse al Usuario.',
  })
  @IsString({ message: 'El campo name debe ser un string.' })
  @IsNotEmpty({ message: 'El campo name no debe estar vacío.' })
  name?: string;
}
