/* eslint-disable prettier/prettier */
//esto es para listar los cars de la url
export class StoreVehicles {
    data: Vehicles;
}
export class Vehicles {
    idVehiculo: number;
    placa: string;
    marca: string;
    modelo: string;
    costo_base: number;
    estado: number;
}
