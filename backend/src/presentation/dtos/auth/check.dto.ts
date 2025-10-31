/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CheckDto {
  @ApiProperty({
    example: 'carlos',
    required: true,
  })
  @IsNotEmpty({ message: 'El campo username no deberia de estar vacio'})
  @IsString({ message: 'Deberia de ser un nombre de usuario'})
  @MinLength(4, { message: 'Debe de tener al menos cuatro caracteres' })
  username: string;

  @ApiProperty({
    example: '123456',
    required: true,
  })
  @IsNotEmpty({ message: 'El campo password no deberia de estar vacio'})
  @IsString({ message: 'Deberia de ser una contraseña de caracteres al menos'})
  @MinLength(2, { message: 'Debe de tener al menos dos caracteres' })
  password: string;
}
