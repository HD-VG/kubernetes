/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @ApiProperty({
    example: 'alguien@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'El campo correo deberia ser un correo valido'})
  @IsNotEmpty({ message: 'El campo correo no deberia de estar vacio'})
  @IsString({ message: 'El campo correo deberia ser un conjunto de caracteres'})
  email: string;

  @ApiProperty({
    example: 'contraseña segura mas de 6 caracteres',
    required: true,
  })
  @IsNotEmpty({ message: 'El campo contraseña no deberia de estar vacio'})
  @IsString({ message: 'El campo correo deberia ser un conjunto de caracteres'})
  password: string;

  @ApiProperty({
    example: 'pedro cabezas',
    required: true,
  })
  @IsString({ message: 'El campo nombre no deberia de estar vacio'})
  @IsNotEmpty({ message: 'El campo correo deberia ser un conjunto de caracteres'})
  name: string;

  @ApiProperty({
    example: 'pedrito123',
    required: true,
  })
  @IsString({ message: 'El campo correo deberia ser un conjunto de caracteres'})
  @IsNotEmpty({ message: 'El campo username no deberia de estar vacio'})
  username: string;

  @ApiProperty({
    example: '{"id_rol":1,"name":"admin"}',
    required: true,
  })
  @IsOptional()
  roles: Rol[]
  
}

export class Rol {
  id_rol: string;
  name?: string;
}
