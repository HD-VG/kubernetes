import { IsNotEmpty, IsNumber, Matches } from "class-validator";

export class CreateRegisterCars {
    @IsNumber()
    @IsNotEmpty()
    register_id: number;

    @IsNumber()
    @IsNotEmpty()
    car: number;
  
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'time must be a valid time in the format HH:mm:ss',
    })
    @IsNotEmpty()
    time: string;
}