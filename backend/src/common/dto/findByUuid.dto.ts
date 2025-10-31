/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString,IsHexadecimal, MinLength} from 'class-validator';

export class FindByUuid {
    @IsNotEmpty({ message: 'UID obligatorio' })
    @IsString()
    @IsHexadecimal()
    @MinLength(16, { message: 'UID debe ser de 16 caracteres hex' })
    uuid: string;
}