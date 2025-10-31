/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
