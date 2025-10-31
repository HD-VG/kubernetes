/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsNumber, Matches } from "class-validator";

export class CreateConfigurationCarDto {

    // @IsNotEmpty({ message: 'Este campo es obligatorio idVehiculo' })
    // @IsString()
    // idVehiculo: string;

    // @IsNotEmpty({ message: 'Este campo es obligatorio licensePlate' })
    // @IsString()
    // licensePlate: string;

    // @IsNotEmpty({ message: 'Este campo es obligatorio make' })
    // @IsString()
    // make: string;

    // @IsNotEmpty({ message: 'Este campo es obligatorio model' })
    // @IsString()
    // model: string;

    // @IsNotEmpty({ message: 'Este campo es obligatorio basicCoste' })
    // @IsNumber()
    // basicCoste: number;
    
    // @IsNotEmpty({ message: 'Este campo es obligatorio estado' })
    // @IsNumber()
    // estado: number;

    @IsNumber()
    @IsNotEmpty()
    register_id: number;

    @IsNumber()
    @IsNotEmpty()
    car: number;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {message: 'time must be a valid time in the format HH:mm:ss',})
    @IsNotEmpty()
    time: string;
}