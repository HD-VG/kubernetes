/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRolDto {
  @ApiProperty({
    example: 'nombre del rol',
    required: true,
  })
  @IsNotEmpty({ message: 'El campo name no deberia de estar vacio' })
  @IsString({ message: 'Deberia de ser un nombre de rol valido' })
  name: string;

  @IsOptional()
  permisos: Permission[]

  @IsOptional()
  monthlyBasic?: number;
}

export class Permission {
  @IsNotEmpty()
  id_permission: number;

  @IsOptional()
  name?: string
}
